
 const Web3 = require('web3');
 const SignedHttpProvider = require('./signedHttpProvider.js');
 const AWS = require('aws-sdk');
 require('dotenv').config();
 
 const endpoint = process.env.AMB_HTTP_ENDPOINT;
 const options = {
   keepAlive: true,
   timeout: 20000, // milliseconds,
   headers: [{ name: 'Access-Control-Allow-Origin', value: '*' }],
 };
 
 const web3 = new Web3(new SignedHttpProvider(endpoint, options));
 
 // Configure AWS SDK with your credentials and region
 AWS.config.update({
   region: 'YOUR_AWS_REGION',
   accessKeyId: 'YOUR_ACCESS_KEY_ID',
   secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
 });
 
 const dynamoDB = new AWS.DynamoDB.DocumentClient();
 
 const NOT_FOUND = 'Not Found';
 
 const eth = {
   'getBalance': async (params) => {
     return await web3.eth.getBalance(...Object.values(params));
   },
   //... other /eth functions here
 };
 
 const net = {
   'getNetworkType': async (params) => {
     return await web3.eth.net.getNetworkType();
   },
   //... other /net functions here
 };
 
 const contract = {
   'mintNFT': async (params) => {
     const contract = new web3.eth.Contract(...Object.values(params));
     const { recipient, tokenURI } = params;
     const sender = await web3.eth.getCoinbase();
 
     // Mint the NFT and perform other operations
 
     // Save the NFT and account information to DynamoDB
     const item = {
       TableName: 'YOUR_DYNAMODB_TABLE_NAME',
       Item: {
         NFTId: newItemId,
         TokenURI: tokenURI,
         Recipient: recipient,
         Sender: sender
       }
     };
     await dynamoDB.put(item).promise();
 
     return newItemId;
   },
   //... other /contract functions here
   'getOwner': async (params) => {
    const contract = new web3.eth.Contract(...Object.values(params));
    return await contract.methods.owner().call();
  },
  'totalRewards': async (params) => {
    const contract = new web3.eth.Contract(...Object.values(params));
    const { user } = params;
    return await contract.methods.totalRewards(user).call();
  },
  'getMintedTokens': async (params) => {
    const contract = new web3.eth.Contract(...Object.values(params));
    const { user } = params;
    return await contract.methods.getMintedTokens(user).call();
  },
  'checkTokenExists': async (params) => {
    const contract = new web3.eth.Contract(...Object.values(params));
    const { tokenURI } = params;
    return await contract.methods.checkTokenExists(tokenURI).call();
  },
 };
 
 const broker = {};
 broker['/eth/'] = (method, params) => eth[method](params);
 broker['/eth/net/'] = (method, params) => net[method](params);
 broker['/eth/contract/'] = (method, params) => contract[method](params);
 
 const sendRes = (status, body) => {
   return {
     'statusCode': status,
     'multiValueHeaders': {},
     'isBase64Encoded': false,
     'headers': {
       'Content-Type': 'application/json',
       'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
       'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
       'Access-Control-Allow-Origin': '*',
       'Cache-Control': 'max-age=0, no-store, must-revalidate',
       'X-Requested-With': '*',
       'Pragma': 'no-cache',
       'Expires': 0
     },
     'body': JSON.stringify(body)
   };
 };
 
 exports.handler = async (event) => {
   console.log('request:', JSON.stringify(event, undefined, 2));
 
   if (event.httpMethod === 'OPTIONS' || event.httpMethod === 'GET') {
     return sendRes(200, { message: 'healthy' });
   } else {
     try {
       const { path } = event;
       const { method, params } = JSON.parse(event.body);
 
       let response = (broker[path]) ? await broker[path](method, params) : NOT_FOUND;
       let status = (response == NOT_FOUND) ? 404 : 200;
       let bodyRes = status == 404 ? { 'error': response } : { 'data': response };
 
       console.log('Response:', JSON.stringify(bodyRes, undefined, 2));
       return sendRes(status, bodyRes);
     } catch (err) {
       console.log('Error:', err);
       return sendRes(500, { error: err.message ?? err });
     }
   }
 };
 