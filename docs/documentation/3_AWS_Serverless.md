# API design

In this part, we will design the API for the backend. The API will be used for the frontend to interact with the backend smart contract.

## 1. API design


First, you need to create a file `.env` in the root folder and add the following variables:

```bash 
AMB_HTTP_ENDPOINT="Enter AMB_HTTP_ENDPOINT"
GANACHE_ENDPOINT="http://localhost:8545"
APPNETWORK="Ganache"
CONTRACTADDRESS="0x17f713aC25039abbfFc34354d3084FC2183b49d5ss"
AWS_REGION="ap-southeast-1"
DYNAMODB_TABLE_NAME="NFT"
```
From the root folder, we move to `api` folder and create a new file `signedHttpProvider.js` as below:

command line
```bash
cd api
npm install web3-providers-http
npm install xhr2
npm install aws-sdk
```
Create a file `signedHttpProvider.js` in `api` folder
```bash
touch signedHttpProvider.js
```

This file will be used to replace the HTTP Provider, and is used for the Lambda Handler to make sigv4 signed requests to the AMB Ethereum Node.

```javascript
 const AWS = require('aws-sdk');
 const { URL } = require('url');
 const HttpProvider = require('web3-providers-http');
 const XHR2 = require('xhr2');
 
 const SignedHttpProvider = HttpProvider;
 
 /**
  * Used to make async request
  *
  * @method send
  * @param {Object} payload
  * @param {Function} callback triggered on end with (err, result)
  */
 SignedHttpProvider.prototype.send = function (payload, callback) {
   const xhReq = new XHR2();
   const timout = this.timeout;
   const endpoint = this.host;
   const method = "POST";
   const servicename = "managedblockchain"
 
   xhReq.timeout = timout;
   xhReq.open(method, endpoint, true);
   xhReq.setRequestHeader("Content-Type", "application/json");
 
   xhReq.onreadystatechange = () => {
     if (xhReq.readyState === 4 && xhReq.timeout !== 1) {
       let response = xhReq.responseText;
       let error = null;
 
       try {
         response = JSON.parse(response);
       } catch (err) { 
 
         if (!!response.error) {
           error = new Error(
             !!response.error.message ? response.error.message : response.error
           );
           error.code = response.error.code;
           callback(error);
         }
       } 
 
       callback(error, response);
     }
   };
 
   xhReq.ontimeout = () => callback(new Error(`Connection timed out after ${timout} ms`), null);
   
   try{
     const body = JSON.stringify(payload);
 
     //get variables for signing and construct HTTP request
     const region =
       process.env.AMB_REGION ?? process.env.AWS_REGION ?? "ap-southeast-1";
     const credentials = new AWS.EnvironmentCredentials("AMB");
     const awsEndpoint = new AWS.Endpoint(endpoint);
     const httpReq = new AWS.HttpRequest(awsEndpoint, region);
 
     httpReq.headers["host"] = new URL(endpoint).host;
     httpReq.method = method;
     httpReq.body = body;
 
     //create sigv4 signed request
     const signer = new AWS.Signers.V4(httpReq, servicename);
     signer.addAuthorization(credentials, new Date());
 
     //add signed auth header to XHR request
     xhReq.setRequestHeader("Authorization", httpReq.headers["Authorization"]);
     xhReq.setRequestHeader("X-Amz-Date", httpReq.headers["X-Amz-Date"]);
     xhReq.send(body);
   } catch (err){
     callback(err, null);
   }
 };
 
 module.exports = SignedHttpProvider;

```

Next, we need to create Web3 functions, there are two options here, if you need to be quick, just need an `index_old.js` file which is main handler for the Lambda function. If you want to have a better structure, you can create a folder `web3` and create a file `index.js` inside this folder. In this project, I sepeated the functions multiple modules so people can follow. 

```javascript
// index_old.js
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
```

Add a module to interact with dynamoDB

```javascript
//dynamoDB.js
import AWS from 'aws-sdk'

export default class DbLogicObject {
    constructor() {
        this.dbClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: 'ap-southeast-1' });
        this.dbTable = 'MyNFTs'; // change to your table name

        this.createItemInDb = this.createItemInDb.bind(this);
        this.getItemFromDb = this.getItemFromDb.bind(this);
        this.getAllItems = this.getAllItems.bind(this);
    }
    createItemInDb(nftID, owner, status, resultCallback) {
        var params = {
            TableName: this.dbTable,
            Item: {
                'NFTID': nftID,
                'Owner': owner,
                'Status': status
            }
        };
        this.dbClient.put(params, (err, data) => {
            if (err) {
                resultCallback({ 'status': 'Error', 'Msg': err, 'data': '' });
            }
            else {
                resultCallback({ 'status': 'Success', 'Msg': '', 'data': nftID });
            }
        });
    }

    getItemFromDb(nftID, resultCallback) {
        var params = {
            TableName: this.dbTable,
            Key: { 'NFTID': nftID }
        };
        this.dbClient.get(params, (err, data) => {
            if (err) {
                resultCallback({ 'status': 'Error', 'Msg': err, 'Items': [] });
            }
            else {
                resultCallback({ 'status': 'Success', 'Msg': '', 'Items': data.Item });
            }

        });
    }

    getAllItems(resultCallback) {
        var params = {
            TableName: this.dbTable
        };
        this.dbClient.scan(params, (err, data) => {
            if (err) {
                resultCallback({ 'status': 'Error', 'Msg': err, 'Items': [] });
            }
            else {
                resultCallback({ 'status': 'Success', 'Msg': '', 'Items': data.Items });
            }
        });
    }
    getAllItemsByKeys(keys, resultCallback) {
        var params = {
            TableName: this.dbTable
        };
        this.dbClient.scan(params, (err, data) => {
            if (err) {
                resultCallback({ 'status': 'Error', 'Msg': err, 'Items': [] });
            }
            else {
                if (data.Count > 0) {
                    let dbItem = [];

                    data.Items.forEach(resultItem => {
                        for (let i = 0; i < keys.length; i++) {
                            if (resultItem.NFTID === keys[i]) {
                                dbItem.push(resultItem);
                                break;
                            }
                        }
                    })
                    resultCallback({ 'status': 'Success', 'Msg': '', 'Items': dbItem });
                }
                else {
                    resultCallback({ 'status': 'Error', 'Msg': err, 'Items': [] });
                }
            }
        });
    }
}
```

## Setup the API

From the root folder, we move to `api` folder:

```bash
npm install 
```


