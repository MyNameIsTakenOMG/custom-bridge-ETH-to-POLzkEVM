// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./PolToken.sol";

contract PolBridge {
    address private polTokenAddress;
    address private owner;

    event PolBurn(address to, uint amount);
    event PolMint(address to, uint amount);

    constructor(address _polTokenAddress) {
        polTokenAddress = _polTokenAddress;
        owner = msg.sender;
    }
    function callBurn(address to, uint amount) external  {
        PolToken polToken = PolToken(polTokenAddress);
        polToken.burn(to, amount);
        emit PolBurn(to, amount);
    }
    function callMint(address to, uint amount) external {
        PolToken polToken = PolToken(polTokenAddress);
        polToken.mint(to, amount);
        emit PolMint(to, amount);
    }
}