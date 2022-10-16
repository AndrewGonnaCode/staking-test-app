// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "./interfaces/IToken.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Staking is ReentrancyGuard{

    uint256 private constant HOUR_IN_SEC = 1 hours;
    uint256 private constant DAY_IN_SEC = 24 hours;
    uint256 private constant REWARD_PERCENTAGE = 10;

    IERC20 staking_token;

    mapping (address => Stake) public userToStake;

    struct Stake{
        address staker;
        uint256 amount;
        uint256 stakingStartTimestamp;
        uint256 lastRewardWithdrawTimestamp;
    }

    event Staked(Stake stake);

    event Withdrawn(address staker, uint256 amount, uint256 withdrawTimestamp);
    
    constructor(address staking_token_address){
        staking_token = IERC20(staking_token_address);
    }

    function stake(uint256 amount) external {
          require(userToStake[msg.sender].amount == 0, "You already staked");
          require(amount >=0, "Stake amount should be > 0");

          Stake memory newStake = Stake(msg.sender, amount, block.timestamp, block.timestamp);

          userToStake[msg.sender] = newStake;

          staking_token.transferFrom(msg.sender, address(this), amount);
          
          emit Staked(Stake(msg.sender, amount, block.timestamp, block.timestamp));
    }

    function withdrawRewards() external nonReentrant{

         Stake memory stake = userToStake[msg.sender];

         require(stake.amount > 0, "You didn't stake");

         require(block.timestamp - stake.lastRewardWithdrawTimestamp >= HOUR_IN_SEC, "You can withdraw reward only once per hour");

         uint256 rewardAmount = stake.amount * REWARD_PERCENTAGE / 100 * (block.timestamp - stake.lastRewardWithdrawTimestamp)/HOUR_IN_SEC;

         staking_token.mint(rewardAmount);

         staking_token.transfer(stake.staker, rewardAmount);

         stake.lastRewardWithdrawTimestamp = block.timestamp;

         userToStake[msg.sender] = stake;
    }

    function withdrawTokens() external {

        Stake memory stake = userToStake[msg.sender];

        require(stake.amount > 0, "You didn't stake");

        require(block.timestamp - stake.stakingStartTimestamp > DAY_IN_SEC, "You can withdraw tokens only after 24 hours");

        uint256 stakeAmount = stake.amount;

        staking_token.transfer(stake.staker, stakeAmount);

        stake.amount = 0;
 
        userToStake[msg.sender] = stake;

        emit Withdrawn(stake.staker, stakeAmount, block.timestamp);

    }
}
