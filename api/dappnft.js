import { ethers } from 'ethers';
import { DynamoDBClient, PutCommand, GetCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import MyNFTContract from './MyNFT.json';
import DbLogicObject from './dynamodb.js';

export default class DAppLogicObject {
    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(process.env.ETH_ENDPOINT);
        this.dblogic = new DbLogicObject();

        this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
        this.MyNFTContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, MyNFTContract.abi, this.wallet);

        this.mintNFT = this.mintNFT.bind(this);
        this.getNFTDetails = this.getNFTDetails.bind(this);
        this.getAllNFTs = this.getAllNFTs.bind(this);
    }

    async mintNFT(req, res) {
        let { recipient, tokenURI } = req.body;

        try {
            let tx = await this.MyNFTContract.mintNFT(recipient, tokenURI);
            await tx.wait();

            // Store NFT details in DynamoDB
            this.dblogic.createItemInDb(tx.hash, recipient, tokenURI, "Minted", (result) => {
                res.json(result);
            });

        } catch (err) {
            res.status(500).json({ 'status': 'Error', 'Msg': err.message });
        }
    }

    async getNFTDetails(req, res) {
        let { nftID } = req.params;

        this.dblogic.getItemFromDb(nftID, (result) => {
            res.json(result);
        });
    }

    async getAllNFTs(req, res) {
        this.dblogic.getAllItems((result) => {
            res.json(result);
        });
    }
}
