pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

    event Stake(address indexed staker, uint256 stakerBalance);

    mapping (address => uint256) private s_balances;

    constructor() payable {
        // what should we do on deploy?
    }

    function getBalance(address staker) public view returns (uint256) {
        return s_balances[staker];
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function deposit() public payable nonReentrant {
        s_balances[msg.sender] += msg.value;
        emit Stake(msg.sender, s_balances[msg.sender]);
    }

    function withdraw(uint256 _amount) public payable nonReentrant {
        uint256 balance = s_balances[msg.sender];
        require(_amount <= balance, "Insufficient balance.");
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Transfer failed.");
        s_balances[msg.sender] -= _amount;
    }

    receive() external payable {
        deposit();
    }

    fallback() external payable {}
}
