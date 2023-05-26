
const RewardToken = artifacts.require("RewardToken");
const MyNFT = artifacts.require("MyNFT");

module.exports = async function(deployer) {
  // First deploy the RewardToken
  await deployer.deploy(RewardToken);
  const rewardToken = await RewardToken.deployed();

  // Then pass its address to the MyNFT constructor
  await deployer.deploy(MyNFT, rewardToken.address);
};
