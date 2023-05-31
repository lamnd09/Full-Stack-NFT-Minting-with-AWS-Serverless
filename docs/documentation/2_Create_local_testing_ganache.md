# Create local blockchain and deploy smart contract 
## 1. Create local blockchain

### Step 1. Clone the repository:
```shell
git clone https://github.com/lamnd09/nft-minting-on-AWS-boilerplate.git
cd nft-minting-on-AWS-boilerplate
```
### Step 2. Running the Dapp 
 For local testing 
 * Create a local Ethereum network using ganache-cli 
```bash
cd net_Blockchain
ganache-cli -a 20 -e 1000  -m "test test test test test test test test test test test okay" -i 1337

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
```

### Smart Contract Development
In this example, I quickly develop a simple smart contract based on ERC 721

In the `/net_Blockchain/contracts/` create a `MyNFT.sol` smart contract as below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping to track the rewards received by each user
    mapping(address => uint256) private rewardsReceived;
    // Mapping to track the NFTs minted by each user
    mapping(address => uint256[]) private userMintedTokens;
    // Mapping to check if a token has already been minted
    mapping(string => bool) private tokenExists;

    constructor() public ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        require(!tokenExists[tokenURI], "Token already exists");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Reward the user with 1 ETH.
        rewardUser(recipient);

        // Track the NFTs minted by the user
        userMintedTokens[recipient].push(newItemId);

        // Mark the token as minted
        tokenExists[tokenURI] = true;

        return newItemId;
    }

    function rewardUser(address user) internal {
        uint256 rewardAmount = 1 ether;

        require(address(this).balance >= rewardAmount, "Not enough Ether to reward user");

        // Update the rewardsReceived mapping
        rewardsReceived[user] += rewardAmount;

        // Transfer the reward to the user.
        (bool success, ) = payable(user).call{value: rewardAmount}("");
        require(success, "Failed to send Ether");

        emit UserRewarded(user, rewardAmount);
    }

    // This function allows the contract owner to deposit ETH into the contract
    function depositETH() public payable {}

    // This function will allow the owner to withdraw all the remaining ETH.
    function withdrawETH() public onlyOwner {
        uint balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    // Function to get the total amount of rewards an user received
    function totalRewards(address user) public view returns (uint256) {
        return rewardsReceived[user];
    }

    // Function to get all tokens minted by a user
    function getMintedTokens(address user) public view returns (uint256[] memory) {
        return userMintedTokens[user];
    }

    // Function to check if a token with a given URI already exists
    function checkTokenExists(string memory tokenURI) public view returns (bool) {
        return tokenExists[tokenURI];
    }

    // Event emitted when a user is rewarded
    event UserRewarded(address indexed user, uint256 rewardAmount);
}
```

Then, we can deploy the smart contract to local Blockchain
```bash
truffle migrate --reset --network development
```
The output looks like:
```bash
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
```

[Optional] In case you want to create a token to reward use instead of using ETH, you need to create another smart contract named `RewardToken.sol` as below: 
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor() ERC20("RewardToken", "RKT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}
```
and deploy it as : 
```bash
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
```
Running the test for smart contract 
```bash
truffle test --network development
```

## 2. IPFS Storage 

We're going to need to configure this metadata as a JSON object and store it, so we can pass it in as the tokenURI parameter when calling our smart contract's mintNFT function.

The text in the "Link to Asset", "Name", "Description" fields will comprise the different properties of our NFT's metadata. We'll format this metadata as a JSON object, but there are a couple options for where we can store this JSON object:

* We could store it on the Ethereum blockchain; however, doing so would be SUPER expensive (we're talking upwards of hundreds of dollars) due to the nature of Ethereum. ❌
* We could store it on a centralized server, like AWS or Firebase. But that would defeat our decentralization ethos. ❌
* We could use IPFS, a decentralized protocol and peer-to-peer network for storing and sharing data in a distributed file system. As this protocol as decentralized and free, it is our best option! ✅

To store our metadata on IPFS, we will use `ipfs-http-client`, a convenient IPFS API and toolkit. 

Run below commands to start ipfs services
```bash
ipfs init
ipfs daemon
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
```
