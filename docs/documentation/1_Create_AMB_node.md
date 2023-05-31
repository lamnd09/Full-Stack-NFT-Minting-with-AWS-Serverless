
# Setting up an Ethereum Testnet Node on Amazon Managed Blockchain (Goerli Testnet)
## 1. Creating an Amazon Blockchain Node

To connect to the Ethereum network, we need to set up a node and link it to the correct network. For testing and development purposes, we will use the Goerli Testnet, a test network that allows blockchain development before deploying on the Mainnet.

### Creating the node may take approximately 30 minutes to complete. Follow these steps:

![image](/docs/figures/amb1.PNG)

* Step 1: Access the AWS Console for Amazon Managed Blockchain.

* Step 2: Choose "Create Node" and select "Ethereum Testnet: Goerli" as the Blockchain Network.
![image](/docs/figures/amb2.PNG)

* Step 3: Keep the default configuration values for the remaining settings.

* Step 4: Click "Create Node" to initiate the node creation process. Refer to the provided image for assistance.
![image](/docs/figures/amb3.PNG)


### Creating the node in the AWS Console
If you want to deploy your app in private network, e.g, Hyperleger Fabric 

```bash
aws managedblockchain create-network \
--cli-input-json '{\"Name\":\"OurBlockchainNet\", \"Description\":\"OurBlockchainNetDesc\", \"Framework\":\"HYPERLEDGER_FABRIC\",\"FrameworkVersion\": \"2.2\", \"FrameworkConfiguration\": {\"Fabric\": {\"Edition\": \"STARTER\"}}, \"VotingPolicy\": {\"ApprovalThresholdPolicy\": {\"ThresholdPercentage\": 50, \"ProposalDurationInHours\": 24, \"ThresholdComparator\": \"GREATER_THAN\"}}, “MemberConfiguration”: {\"Name\":\"org1\", \"Description\":\"Org1 first member of network\", \"FrameworkConfiguration\":{\"Fabric\":\n{\"AdminUsername\":\"MyAdminUser\",\"AdminPassword\":\"Password123\"}}, \"LogPublishingConfiguration\": {\"Fabric\":{\"CaLogs\":{\"Cloudwatch\": {\"Enabled\": true}}}}}}'
```

The output should be: 
```bash
{
    "NetworkId": "n-XXXXXXXXXXXXXXXXXXXXXXXXX",
    "MemberId": "m-XXXXXXXXXXXXXXXXXXXXXXXXX"
}
```
> Creating an AMB node would take quite long time

Once the node creation is finished, navigate to the node details page by clicking on the node ID. Copy the HTTP endpoint provided on this page. This endpoint will be necessary in the next steps. 