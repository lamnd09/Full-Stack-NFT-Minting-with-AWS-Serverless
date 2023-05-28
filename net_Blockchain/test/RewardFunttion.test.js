const MyNFT = artifacts.require("MyNFT");
const { expect } = require('chai');

contract("MyNFT", accounts => {
    let myNFT = null;
    const owner = accounts[0];
    const recipient = accounts[1];

    beforeEach(async () => {
        myNFT = await MyNFT.new({ from: owner });
        // Add some ETH to the contract
        await web3.eth.sendTransaction({ from: owner, to: myNFT.address, value: web3.utils.toWei('10', 'ether') });
    });

    it("should return the correct total rewards of a user", async () => {
        // Mint two tokens
        await myNFT.mintNFT(recipient, "tokenURI1", { from: owner });
        await myNFT.mintNFT(recipient, "tokenURI2", { from: owner });

        const totalRewards = await myNFT.totalRewards(recipient);
        expect(totalRewards.toString()).to.equal(web3.utils.toWei("2", "ether")); // Each mint rewards 1 Ether
    });

    it("should return all tokens minted by a user", async () => {
        // Mint two tokens
        await myNFT.mintNFT(recipient, "tokenURI1", { from: owner });
        await myNFT.mintNFT(recipient, "tokenURI2", { from: owner });

        const mintedTokens = await myNFT.getMintedTokens(recipient);
        expect(mintedTokens.length).to.equal(2);
        expect(mintedTokens[0].toString()).to.equal('1'); // First token ID should be 1
        expect(mintedTokens[1].toString()).to.equal('2'); // Second token ID should be 2
    });
});
