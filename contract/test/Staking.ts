import { Token } from '../typechain-types/contracts/Token';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { getLatestBlockTimestamp, setBlockTime } from './utils';

describe("Staking", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTokenFixture() {
    const ONE_HOUR_IN_SEC = 60 * 60;
    const ONE_DAY_IN_SEC = ONE_HOUR_IN_SEC * 24;
    const REWARD_PERCENT = 10;
    const STAKE_AMOUNT = ethers.utils.parseEther('100');


    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(token.address);

    return { token, staking, owner, otherAccount, STAKE_AMOUNT, ONE_HOUR_IN_SEC, ONE_DAY_IN_SEC, REWARD_PERCENT };
  }

  describe("E2E staking", function () {
    it("Should successfully mint tokens", async function () {
      const { token, STAKE_AMOUNT, owner} = await loadFixture(deployTokenFixture);
      await token.mint(STAKE_AMOUNT);
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.eq(STAKE_AMOUNT);
    });

    it("Should successfully stake tokens", async function () {
      const { token, staking, STAKE_AMOUNT} = await loadFixture(deployTokenFixture);
      await token.mint(STAKE_AMOUNT);

      await token.approve(staking.address, STAKE_AMOUNT);
    
      const tx = await staking.stake(STAKE_AMOUNT)
      expect(tx).not.to.be.reverted;
    });

    it("Should successfully withdraw tokens", async function () {
      const { token, staking, STAKE_AMOUNT, ONE_DAY_IN_SEC} = await loadFixture(deployTokenFixture);
      await token.mint(STAKE_AMOUNT);

      await token.approve(staking.address, STAKE_AMOUNT);
    
      await staking.stake(STAKE_AMOUNT)
      
      const currentTimestamp = await getLatestBlockTimestamp();

      await setBlockTime(currentTimestamp + ONE_DAY_IN_SEC);

      const tx = await staking.withdrawTokens();

      expect(tx).not.to.be.reverted;

    });

    it("Should successfully withdraw rewards", async function () {
      const { token, staking, STAKE_AMOUNT, ONE_HOUR_IN_SEC} = await loadFixture(deployTokenFixture);
      await token.mint(STAKE_AMOUNT);

      await token.approve(staking.address, STAKE_AMOUNT);
    
      await staking.stake(STAKE_AMOUNT)
      
      const currentTimestamp = await getLatestBlockTimestamp();

      await setBlockTime(currentTimestamp + ONE_HOUR_IN_SEC);

      const tx = await staking.withdrawRewards();

      expect(tx).not.to.be.reverted;

    });

    it("Should successfully withdraw 10 tokens as reward", async function () {
      const { token, staking, owner, STAKE_AMOUNT, ONE_HOUR_IN_SEC, REWARD_PERCENT} = await loadFixture(deployTokenFixture);
      await token.mint(STAKE_AMOUNT);

      await token.approve(staking.address, STAKE_AMOUNT);
    
      await staking.stake(STAKE_AMOUNT);

      
      const currentTimestamp = await getLatestBlockTimestamp();

      await setBlockTime(currentTimestamp + ONE_HOUR_IN_SEC);

      await staking.withdrawRewards();
    

      const balanceAfterWithdraw = await token.balanceOf(owner.address);

      const formattedBalance = Math.round(Number(ethers.utils.formatEther(balanceAfterWithdraw)))

      const foramttedStakeAmount = Number(ethers.utils.formatEther(STAKE_AMOUNT))

      expect(formattedBalance).to.be.eq(foramttedStakeAmount * REWARD_PERCENT/100);
    });






    //  Negative tests
    it("Should revert if user tries to claim erlier than 24 hours", async function () {
      const { token, staking, STAKE_AMOUNT} = await loadFixture(deployTokenFixture);
      await token.mint(STAKE_AMOUNT);

      await token.approve(staking.address, STAKE_AMOUNT);
    
      await staking.stake(STAKE_AMOUNT)

      const tx = staking.withdrawTokens();

      expect(tx).to.be.revertedWith("You can withdraw tokens only after 24 hours");
    });

    it("Should revert if user tries to claim rewards erlier than 1 hour", async function () {
      const { token, staking, STAKE_AMOUNT} = await loadFixture(deployTokenFixture);
      await token.mint(STAKE_AMOUNT);

      await token.approve(staking.address, STAKE_AMOUNT);
    
      await staking.stake(STAKE_AMOUNT)

      const tx = staking.withdrawRewards();

      expect(tx).to.be.revertedWith("You can withdraw reward only once per hour");
    });

    it("Should revert if user didn't stake", async function () {
        const { staking,} = await loadFixture(deployTokenFixture);

        const tx = staking.withdrawTokens();
  
        expect(tx).to.be.revertedWith("You didn't stake");

    });

    it("Should revert if user tries to claim rewards erlier than 1 hour second time", async function () {
      const { token, staking, STAKE_AMOUNT, ONE_HOUR_IN_SEC} = await loadFixture(deployTokenFixture);

      await token.mint(STAKE_AMOUNT);

      await token.approve(staking.address, STAKE_AMOUNT);
    
      await staking.stake(STAKE_AMOUNT)

      const currentTimestamp = await getLatestBlockTimestamp();

      await setBlockTime(currentTimestamp + ONE_HOUR_IN_SEC);

      await staking.withdrawRewards();

      await setBlockTime(currentTimestamp + ONE_HOUR_IN_SEC * 1.5);

      const tx  = staking.withdrawRewards();

      expect(tx).to.be.revertedWith("You can withdraw reward only once per hour");
    });
    
    
    
  });
});
