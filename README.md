# NFT Project on AWS Serverless
This project is a decentralized application (DApp) for managing Non-Fungible Tokens (NFTs) on the Ethereum blockchain deployed in AWS Services.
**[General Requirement]** Develop a serverless web application with a basic dashboard for a minting and distribution system of rewards in an NFT project. Implement a cron job to retrieve data from a database and automate the minting, distribution, and coin rewards for each NFT in a secure and scalable way using AWS technologies


## Architecture Design

Based on the requirements, I design an AWS Serverless system as below:

[image](/docs/figures/aws_serverless_NFT.jpg)

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
 - AWS serverless, Lambda, Amplify, DynamoDB, etc. 
 - Useful link: ... add a youtube link here 



## Local Test phase

### 1. Install dependencies
```
npm install
```

### 2. Running the local test
```
ganache-cli -a 20 -e 1000  -m "test test test test test test test test test test test okay" -i 1337
truffle migrate --reset --network development
truffle test --network development
```
 
### 3. Deposit funds to the contract
```
node src/utils/depositEthereum.js 
```

### 4. Run the local server
```

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

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'


http://localhost:8080/ipfs/QmQ8dpUy2m4D11o489hkgrF2ttW5ftdPSbzmb6qcHKTGGj


QmewEXjVzGQHmWzUVJopEgSsPrkd9npS4boyW2PNGGKVFv

Available Accounts
==================
(0) 0x8dE930dbAd0D99759Db57C2F906010f87D4185FF (1000 ETH)
(1) 0x9032969C6ac84f644bA65E40089ce221053ad624 (1000 ETH)
(2) 0xA1e77EC2f0ad59121DA812cd5be61E3CAc30F472 (1000 ETH)
(3) 0x363404432Aa9d4EF5629f80DAcFF0CD389dd38c8 (1000 ETH)
(4) 0x5c22Fd2D3E9eB70EF3585E0F895eE4d076d04414 (1000 ETH)
(5) 0xF221a97B436f16b8a2916eA232f45D5f5C5DAD10 (1000 ETH)
(6) 0xbB1B81B162671DA3c7F1d226f8223d31219AC25b (1000 ETH)
(7) 0x8479FA625398E9999CE68cebd52ba72D3B1edF35 (1000 ETH)
(8) 0x34A24CBA2FfE10b9e58E5B422ac9a2B1D1385974 (1000 ETH)
(9) 0x8C80DB0749527D5793f0c15d2c921439B7685D45 (1000 ETH)
(10) 0xbfFd8c83e2f2D8da1CF602e2EEB6090f173ffa7D (1000 ETH)
(11) 0x7d49dAD88888b6ae983aeB79215F169c9562C4c0 (1000 ETH)
(12) 0xAa0b485DD067c1FaAA4D576fD8d33E9efdd52A1C (1000 ETH)
(13) 0xB07692B290BDf5A4316D9dAe4e010943ab0Dd315 (1000 ETH)
(14) 0xF8921aD71925Cd074447f49537eEa31b214cD18E (1000 ETH)
(15) 0xE82b435cEE98d8E0c01D546Dd77b0Cf251747484 (1000 ETH)
(16) 0x3530736ae543AAf7f25d88223a318b7d06aE658c (1000 ETH)
(17) 0xA4cCf8c849FCb67BB405dC3f8466a007aD6A4342 (1000 ETH)
(18) 0x35818D06ca25e6a33107e24E83c6bc54B2765fF8 (1000 ETH)
(19) 0x0186e0C97F0F05222cB6bA7303f176fc40D145A1 (1000 ETH)

Private Keys
==================
(0) 0xaefcaad212aba1ac9c96f94f5dcef495467fb745179976fbe31711bc559fedcf
(1) 0xb2152533065ded1085494e704786c14e4258097fba26273adf5f44645fca17d2
(2) 0xceb1d8bc2c141e448d3d31fb5671a1b03a552a8d5ec683ad9513aa8289b84a8b
(3) 0x8ab686ec316e15671f09cceaf463d8d2bca58d87852f7f245aef86a787834abc
(4) 0x5263a193a48c089e9320320bac29b0fbd89c3e1abc5e8c3bc938b87dd4e4de15
(5) 0xc1a2ac12f6560e32fcac5ab7631bd6282c20e2b37abd307ed29ab033db3b1584
(6) 0xdf6a761d07a100a1ab5ddbe3c71ea4a042646f70d5bd7bf859d41390b0dd535f
(7) 0x2571e1f4956c24cf6dab506f6dfcbd3b05cb86088a60a84927dd3898b64fcc10
(8) 0xf0f5a30851e130f9c883fbfffed41d12f9d542cd1353ee9ba4c7557db5b09089
(9) 0xceb14f2b1984378acce993c29e189e730c2595f17b2727a3287e3abd425ec268
(10) 0x6c9671e0692c294518d00606db9b66f2f6bdcfb1aff85cd908ab355d62fbf14e
(11) 0x585e742f3a8780f6f24050e7623502e49a39605b6525e592ef7ab17422ffc624
(12) 0x5d5aec7f762bef35727193cfb492ee791b06a59994b7856984909c9f9ff5b6ad
(13) 0xaf8bf1157aa701f5278070635de57345749c5f6f66618de07c6ce6ca6ac8801c
(14) 0x54f11f5e6d60a3a3f60e89b3ff63d58f53fc23a209d5427fefaa818ba6042215
(15) 0x4325517bfc16bc6135140953bba247c72adb3acde5c6e76a1736d9d5570e8a66
(16) 0xea08268b924d73289d1131de32100a672c11d14b2d867fcb86fc99eea954de88
(17) 0xbfa6257746cf8a07e98a2a0baa82b3d942aa75746e5d1656ce661d5adb0b4342
(18) 0xaca8ac2a67d7ed6102cd59b7da7af400f80ea27aee948a8a4cddfb37b49e8a1a
(19) 0x3c470666ffa95b900b8c3246bc87f85058d38bbd6cc74a40c3ea42b5c4f8f821