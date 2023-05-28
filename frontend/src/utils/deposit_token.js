const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

// Contract and Token details
const contractAddress = '0xF50bF71285c0f9Eb09473100c12Aa28E2AE6E380';
const contractABI = require('../contract-abi.json');
const tokenAddress = '0x17f713aC25039abbfFc34354d3084FC2183b49d5';
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
const amount = 100; // Amount of tokens to deposit
const yourAddress = '0x8dE930dbAd0D99759Db57C2F906010f87D4185FF';

depositTokens(amount, yourAddress);
