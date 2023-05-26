const rewardToken = artifacts.require("RewardToken");

module.exports = function (deployer) {
    deployer.deploy(rewardToken);
}