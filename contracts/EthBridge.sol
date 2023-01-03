// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./EthToken.sol";

contract EthBridge {
    address private ethTokenAddress;
    address private owner;

    event EthBurn(address indexed to, uint amount);
    event EthMint(address indexed to, uint amount);

    constructor(address _ethTokenAddress) { 
        owner = msg.sender;
        ethTokenAddress = _ethTokenAddress;
    }
    function callBurn(address to, uint amount) external  {
        EthToken ethToken = EthToken(ethTokenAddress);
        ethToken.burn(to, amount);
        emit EthBurn(to, amount);
    }
    function callMint(address to, uint amount) external {
        EthToken ethToken = EthToken(ethTokenAddress);
        ethToken.mint(to, amount);
        emit EthMint(to, amount);
    }
    function getOwner() public view returns(address){
        return owner;
    }
    function getEthTokenAddress() public view returns(address){
        return ethTokenAddress;
    }
}