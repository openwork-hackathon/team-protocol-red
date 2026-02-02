// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor() ERC20("Mock Openwork", "MOCK") {
        _mint(msg.sender, 1000000 * 10**18);
    }

    function mintFree() external {
        _mint(msg.sender, 1000 * 10**18); // Free 1000 tokens for everyone
    }
}
