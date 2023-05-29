import AWS from 'aws-sdk'

export default class DbLogicObject {
    constructor() {
        this.dbClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: 'ap-southeast-1' });
        this.dbTable = 'MyNFTs'; // change to your table name

        this.createItemInDb = this.createItemInDb.bind(this);
        this.getItemFromDb = this.getItemFromDb.bind(this);
        this.getAllItems = this.getAllItems.bind(this);
    }
    createItemInDb(nftID, owner, price, status, resultCallback) {
        var params = {
            TableName: this.dbTable,
            Item: {
                'NFTID': nftID,
                'Owner': owner,
                'Price': price,
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
