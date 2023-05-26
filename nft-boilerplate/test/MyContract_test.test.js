const { expect } = require("chai");
const RewardToken = artifacts.require("RewardToken");
const MyNFT = artifacts.require("MyNFT");

contract("NFT and RewardToken test", function (accounts) {
    it("Mints NFT and rewards owner", async function () {
        /* Same as before */
    });

    it("Mints multiple NFTs", async function () {
        const owner = accounts[0];
        const rewardToken = await RewardToken.new();
        const myNFT = await MyNFT.new(rewardToken.address);

        const initialRewardSupply = web3.utils.toWei("100", "ether");
        await rewardToken.transfer(myNFT.address, initialRewardSupply);

        // Mint two NFTs
        await myNFT.mintNFT(owner, "tokenURI1", { from: owner });
        await myNFT.mintNFT(owner, "tokenURI2", { from: owner });

        // Owner should have 2 NFTs
        expect((await myNFT.balanceOf(owner)).toString()).to.equal("2");

        // Owner should have 999902 reward tokens (999902 * 10**18)
        const ownerBalance = await rewardToken.balanceOf(owner);
        expect(ownerBalance.toString()).to.equal(web3.utils.toWei("999902", "ether"));
    });

    it("Fails to mint when not enough reward tokens", async function () {
        const owner = accounts[0];
        const rewardToken = await RewardToken.new();
        const myNFT = await MyNFT.new(rewardToken.address);

        // Transfer less than 1 token to the contract
        await rewardToken.transfer(myNFT.address, web3.utils.toWei("0.5", "ether"));

        // Expect minting to fail
        try {
            await myNFT.mintNFT(owner, "tokenURI", { from: owner });
        } catch (error) {
            expect(error.message).to.include("Not enough tokens in contract to reward user");
            return;
        }

        assert(false, "The contract should have thrown an error but didn't");
    });

    it("Transfers NFT ownership correctly", async function () {
        const [owner, recipient] = accounts;
        const rewardToken = await RewardToken.new();
        const myNFT = await MyNFT.new(rewardToken.address);

        const initialRewardSupply = web3.utils.toWei("100", "ether");
        await rewardToken.transfer(myNFT.address, initialRewardSupply);

        // Mint NFT
        await myNFT.mintNFT(owner, "tokenURI", { from: owner });

        // Transfer NFT
        await myNFT.transferFrom(owner, recipient, 1, { from: owner });

        // Recipient should now have one NFT
        expect((await myNFT.balanceOf(recipient)).toString()).to.equal("1");

        // Original owner should have zero NFTs
        expect((await myNFT.balanceOf(owner)).toString()).to.equal("0");
    });
});
