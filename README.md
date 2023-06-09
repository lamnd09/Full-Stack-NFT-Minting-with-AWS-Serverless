# Full Stack NFT Minting Application with AWS Serverless
This project is a decentralized application (DApp) for managing Non-Fungible Tokens (NFTs) on the Ethereum blockchain deployed in AWS Services.

**[General Requirement]** Develop a serverless web application with a basic dashboard for a minting and distribution system of rewards in an NFT project. Implement a cron job to retrieve data from a database and automate the minting, distribution, and coin rewards for each NFT in a secure and scalable way using AWS technologies

## Architecture Design

Based on the requirements, I design an AWS Serverless system as below:

![image](/docs/figures/aws_serverless_NFT.jpg)

## 1. Application Features
- Mint new NFTs with unique metadata and tokenURI
- View owned NFTs and their details
- Get Rewards for minting NFTs, and show the reward balance
- View all NFTs minted by a specific user
- CI/CD process for project

## 2. Technologies Used
### 2.1. For local testing Boilerplate 
- Solidity: Programming language for writing smart contracts on Ethereum
- Truffle: Development framework for Ethereum DApps
- Open Zeppelin: Library for secure smart contract development
- Web3.js: JavaScript library for interacting with Ethereum blockchain
- React: JavaScript library for building user interfaces
- IPFS: Decentralized storage for NFT metadata (for local testing)
- Ganache: Local Ethereum blockchain for development and testing
  
 ### 2.2 For AWS deployment 
 - AWS Account 
 - AWS serverless, Lambda, CloudFront, DynamoDB, etc. 
 - Amazon API Gateway
 - AWS Amazon Managed Blockchain
 - [Optional] Amazon Cognito
 - Please refer to my AWS serverless tutorial in youtube for more detail. 

## 3. Project Setup
The detail of instructions is described as below
1. [Create AWS AMB to communicate with Ethereum Goerli testnet](./docs/documentation/1_Create_AMB_node.md)
2. [Create and Deploy Smart Contract to Local/Testnet Blockchain](./docs/documentation/2_Create_local_testing_ganache.md)
3. [Create AWS services to interact with Ethereum blockchain and Frontend](./docs/documentation/3_AWS_Serverless.md)
4. [Design the FrontEnd for the project](./docs/documentation/4_Front_End_Design.md)
## Dashboard 

The dashboard looks like:
![image](/docs/figures/frontend-1.png)

## 4. References 
[1] https://docs.aws.amazon.com/serverless-application-model/index.html

[2] NFT Minter Tutorial: How to Create a Full Stack DApp, https://docs.alchemy.com/docs/nft-minter

[3] Develop a Full Stack Serverless NFT Application with Amazon Managed Blockchain – Part 1 | AWS Database Blog}, https://aws.amazon.com/blogs/database/part-1-develop-a-full-stack-serverless-nft-application-with-amazon-managed-blockchain/}. 
