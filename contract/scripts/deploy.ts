import { ethers } from "hardhat";

async function main() {


  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();

  await token.deployed();
  console.log(`Token was deployed to ${token.address}`);

  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(token.address);

  await staking.deployed();
  
  console.log('Staking deployed to', staking.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
