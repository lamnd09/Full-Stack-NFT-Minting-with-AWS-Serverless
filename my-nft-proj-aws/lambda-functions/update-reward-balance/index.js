const Web3 = require('web3');
const AWS = require('aws-sdk');

const web3 = new Web3(process.env.INFURA_URL);
const contract = new web3.eth.Contract(process.env.CONTRACT_ABI, process.env.CONTRACT_ADDRESS);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // implementation of updating rewards balance...
};
