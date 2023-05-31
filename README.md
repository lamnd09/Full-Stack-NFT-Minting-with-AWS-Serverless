# NFT Project on AWS Serverless
This project is a decentralized application (DApp) for managing Non-Fungible Tokens (NFTs) on the Ethereum blockchain deployed in AWS Services.
**[General Requirement]** Develop a serverless web application with a basic dashboard for a minting and distribution system of rewards in an NFT project. Implement a cron job to retrieve data from a database and automate the minting, distribution, and coin rewards for each NFT in a secure and scalable way using AWS technologies

## Architecture Design

Based on the requirements, I design an AWS Serverless system as below:

![image](/docs/figures/aws_serverless_NFT.jpg)

## 1. Features
- Mint new NFTs with unique metadata and tokenURI
- View owned NFTs and their details
- Explore the NFT marketplace
- Trade NFTs with other users

## 2. Technologies Used
### 2.1. For local testing Boilerplate 
- Solidity: Programming language for writing smart contracts on Ethereum
- Truffle: Development framework for Ethereum DApps
- Open Zeppelin: Library for secure smart contract development
- Web3.js: JavaScript library for interacting with Ethereum blockchain
- React: JavaScript library for building user interfaces
- IPFS: Decentralized storage for NFT metadata
- Ganache: Local Ethereum blockchain for development and testing
  
 ### 2.2 For AWS deployment 
 - AWS Account 
 - AWS serverless, Lambda, CloudFront, DynamoDB, etc. 
 - Amazon API Gateway
 - AWS Amazon Managed Blockchain
 - [Optional] Amazon Cognito
 - Useful link: ... add a youtube link here 

## 3. Project Setup

The detail of instructions is described as below

1. [Create AWS AMB to communicate with Ethereum Goerli testnet](./docs/documentation/1_Create_AMB_node.md)

2. [Create and Deploy Smart Contract to Local/Testnet Blockchain](./docs/documentation/2_Create_local_testing_ganache.md)

2. [Create AWS Lambda function to interact with Ethereum blockchain](./docs/documentation/2_Create_Lambda_function.md)


## 4. References 



## 5. License 
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

http://localhost:8080/ipfs/QmewEXjVzGQHmWzUVJopEgSsPrkd9npS4boyW2PNGGKVFv


y.js 
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 10000000000000000000000
MyNFT contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3


ganache-cli -a 20 -e 1000  -m "test test test test test test test test test test test okay" -i 1337


ganache-cli -a 20 -p 8546 -e 1000  -m "test test test test test test test test test test test okay"

 Replacing 'RewardToken'
   -----------------------
   > transaction hash:    0x8a605050434a2f08a2fddd8d0421f1d8a217bcea9b13f966aa7362f6ba935690
   > Blocks: 0            Seconds: 0
   > contract address:    0x17f713aC25039abbfFc34354d3084FC2183b49d5
   > block number:        1
   > block timestamp:     1685077850
   > account:             0x8dE930dbAd0D99759Db57C2F906010f87D4185FF
   > balance:             999.97654816
   > gas used:            1172592 (0x11e470)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02345184 ETH


   Replacing 'MyNFT'
   -----------------
   > transaction hash:    0x4d0d1f950227b8bec0be43a14362ca8ed5e9e282dcc94f1beb1d154e2ab01fde
   > Blocks: 0            Seconds: 0
   > contract address:    0xF50bF71285c0f9Eb09473100c12Aa28E2AE6E380
   > block number:        2
   > block timestamp:     1685077850
   > account:             0x8dE930dbAd0D99759Db57C2F906010f87D4185FF
   > balance:             999.91790376
   > gas used:            2932220 (0x2cbdfc)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0586444 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.08209624 ETH




http://localhost:8080/ipfs/Qme2fW9XicTgVe4U5hRuTMC9i1bZiLmwUz8nEbaTExcx9W

http://localhost:8080/ipfs/QmewEXjVzGQHmWzUVJopEgSsPrkd9npS4boyW2PNGGKVFv



http://localhost:8080/ipfs/QmQ8dpUy2m4D11o489hkgrF2ttW5ftdPSbzmb6qcHKTGGj


QmewEXjVzGQHmWzUVJopEgSsPrkd9npS4boyW2PNGGKVFv
