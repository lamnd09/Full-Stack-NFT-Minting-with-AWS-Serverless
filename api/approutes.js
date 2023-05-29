const express = require('express');
const DAppObject = require('./dapplogic');

var router = express.Router();
var dapp = new DAppObject();

router.post('/mintNFT', dapp.mintNFT);
router.get('/checkTokenExists/:tokenURI', dapp.checkTokenExists);
router.get('/getMintedTokens/:address', dapp.getMintedTokens);
router.get('/totalRewards/:address', dapp.totalRewards);
router.post('/depositETH', dapp.depositETH);
router.post('/withdrawETH', dapp.withdrawETH);

module.exports = router;
