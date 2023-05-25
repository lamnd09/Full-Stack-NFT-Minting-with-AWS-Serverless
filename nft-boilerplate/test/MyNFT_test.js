const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("MyNFT", function () {
  let RewardToken, rewardToken, MyNFT, myNFT, owner, addr1, addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    RewardToken = await ethers.getContractFactory("ERC20PresetMinterPauser");
    MyNFT = await ethers.getContractFactory("MyNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy RewardToken contract and mint some tokens for the NFT contract
    rewardToken = await RewardToken.deploy("ETH", "ETH");
    await rewardToken.deployed();
    await rewardToken.mint(owner.address, ethers.utils.parseEther("1000"));

    // Deploy the MyNFT contract
    myNFT = await MyNFT.deploy(rewardToken.address);
    await myNFT.deployed();

    // Transfer reward tokens to the MyNFT contract
    await rewardToken.transfer(myNFT.address, ethers.utils.parseEther("500"));
  });

  describe("Minting NFT", function () {
    it("Should reward user with tokens on successful minting", async function () {
      // Mint a new NFT
      await myNFT.connect(owner).mintNFT(addr1.address, "tokenURI");

      // Check balance of user after minting
      expect(await rewardToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("1"));
    });
  });
});