// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

error PolToken__NotOwner();

contract PolToken is ERC20, ERC20Burnable {

    address private owner;

    constructor() ERC20("PolToken", "PT") {
        owner = msg.sender;
    }

    modifier onlyOwner(address to) {
        if(owner != to) revert PolToken__NotOwner();
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