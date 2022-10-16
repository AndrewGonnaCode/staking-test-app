// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Token is ERC20 {
    
    constructor() ERC20("MyTestCoin", "MTC") {}

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
