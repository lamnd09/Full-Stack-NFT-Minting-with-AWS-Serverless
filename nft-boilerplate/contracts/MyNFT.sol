// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IERC20 public rewardToken;

    constructor(IERC20 _rewardToken) public ERC721("MyNFT", "NFT") {
        rewardToken = _rewardToken;
    }

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Reward the user with ERC20 tokens
        rewardUser(recipient);

        return newItemId;
    }

    function rewardUser(address user) internal {
        // Define the reward amount. It could also be variable.
        uint256 rewardAmount = 1 * 10**18; // This assumes that your token has 18 decimals, change it accordingly.

        // Check if the contract has enough balance to give the reward.
        require(rewardToken.balanceOf(address(this)) >= rewardAmount, "Not enough tokens in contract to reward user");

        // Transfer the reward to the user
        rewardToken.transfer(user, rewardAmount);
    }
}