# nft-market-on-AWS
This project implements basic full workflow cycle of nft project 


y.js 
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 10000000000000000000000
MyNFT contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3


ganache-cli -a 20 -e 100000 -l 8000000 -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" -i 1337


  Replacing 'RewardToken'
   -----------------------
   > transaction hash:    0x9650f55990e05b5fe4752fbd5dd97e77470bc5d36ffb1841b8d0c2d130566493
   > Blocks: 0            Seconds: 0
   > contract address:    0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0
   > block number:        1
   > block timestamp:     1685057309
   > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
   > balance:             99999.97654816
   > gas used:            1172592 (0x11e470)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02345184 ETH


   Replacing 'MyNFT'
   -----------------
   > transaction hash:    0x107c9d0e693ee30ad249a6817522b30cb7e1d6edf38c24bf0ca326b7c744c625
   > Blocks: 0            Seconds: 0
   > contract address:    0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da
   > block number:        2
   > block timestamp:     1685057310
   > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
   > balance:             99999.91836886
   > gas used:            2908965 (0x2c6325)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0581793 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.08163114 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.08163114 ETH



http://localhost:8080/ipfs/QmewEXjVzGQHmWzUVJopEgSsPrkd9npS4boyW2PNGGKVFv

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
