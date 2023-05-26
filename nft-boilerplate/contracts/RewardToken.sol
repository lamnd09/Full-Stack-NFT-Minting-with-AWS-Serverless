// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor() ERC20("RewardToken", "MRT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}
