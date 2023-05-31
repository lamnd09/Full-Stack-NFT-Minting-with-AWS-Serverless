
# Setting up an Ethereum Testnet Node on Amazon Managed Blockchain (Goerli Testnet)
## 1. Creating an Amazon Blockchain Node

To connect to the Ethereum network, we need to set up a node and link it to the correct network. For testing and development purposes, we will use the Goerli Testnet, a test network that allows blockchain development before deploying on the Mainnet.

Creating the node may take approximately 30 minutes to complete. Follow these steps:

* Step 1: Access the AWS Console for Amazon Managed Blockchain.
* Step 2: Choose "Create Node" and select "Ethereum Testnet: Goerli" as the Blockchain Network.
* Step 3: Keep the default configuration values for the remaining settings.
* Step 4: Click "Create Node" to initiate the node creation process. Refer to the provided image for assistance.

Creating the node in the AWS Console

Note: The actual creation of the node can take up to 30 minutes.

Once the node creation is finished, navigate to the node details page by clicking on the node ID. Copy the HTTP endpoint provided on this page. This endpoint will be necessary in the next step. 