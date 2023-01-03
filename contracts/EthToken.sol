// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

error EthToken__NotOwner();

contract EthToken is ERC20, ERC20Burnable{

    address private owner;

    constructor() ERC20("EthToken", "ET"){
        owner = msg.sender;
    }

    modifier onlyOwner(address to) {
        if(owner != to) revert EthToken__NotOwner();
        _;
    }

    function mint(address to, uint256 amount) external onlyOwner(to) {
        _mint(to, amount);
    }
    function burn(address to, uint256 amount) external onlyOwner(to){
        _burn(to, amount);
    }
    function getOwner() public view returns(address){
        return owner;
    }
}