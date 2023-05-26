const Web3 = require('web3');
const web3 = new Web3(window.ethereum);

// Contract and Token details
const contractAddress = '0x09099668ffA1b4E917B6b3965632b682f4B94fbC';
const contractABI = require('../contract-abi.json');
const tokenAddress = '0x07b75bB66ABE33769DaAf79069EE85933DfA35c9';
const tokenABI = require('../rewardtoken-abi.json');

// Function to deposit tokens into the contract
async function depositTokens(amount, yourAddress) {
  try {
    // Create instances of the contract and token contracts
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

    // Approve the contract to spend tokens
    await tokenContract.methods.approve(contractAddress, amount).send({ from: yourAddress });

    // Deposit tokens into the contract
    await contract.methods.depositTokens(amount).send({ from: yourAddress });

    console.log('Tokens deposited successfully.');
  } catch (error) {
    console.error('Error depositing tokens:', error);
  }
}

// Usage example
const amount = 1000000; // Amount of tokens to deposit
const yourAddress = '0x8dE930dbAd0D99759Db57C2F906010f87D4185FF';

depositTokens(amount, yourAddress);
