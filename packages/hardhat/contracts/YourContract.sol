pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

    bool private locked;

    modifier noReentrancy() {
        require(!locked, "Reentrant call.");
        locked = true;
        _;
        locked = false;
    }

    event Stake(address indexed staker, uint256 stakerBalance);

    mapping (address => uint256) private s_balances;

    constructor() payable {
        // what should we do on deploy?
    }

    function stake() public payable {
        s_balances[msg.sender] += msg.value;
        emit Stake(msg.sender, s_balances[msg.sender]);
    }

    function getBalance(address staker) public view returns (uint256) {
        return s_balances[staker];
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) public payable noReentrancy {
        uint256 balance = s_balances[msg.sender];
        require(amount <= balance, "Insufficient balance.");
        s_balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    receive() external payable {
        stake();
    }

    fallback() external payable {}
}
