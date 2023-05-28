const Web3 = require('web3');
const contractABI = require('../contract-abi.json'); // Replace with the actual path to your contract's ABI JSON file

async function getMintedTokens(userAddress) {
    // Create a new web3 instance and connect to the blockchain
    const web3 = new Web3('http://localhost:8545');

    // Get the contract instance
    const contractAddress = '0x17f713aC25039abbfFc34354d3084FC2183b49d5';
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        // Call the contract's getMintedTokens function
        const tokens = await contract.methods.getMintedTokens(userAddress).call();

        // Return the array of minted tokens
        return tokens;
    } catch (error) {
        console.error('Error retrieving minted tokens:', error);
        return [];
    }
}

// Usage example

export default getMintedTokens;