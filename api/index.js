const express = require('express');
const router = require('./dappnftroutes');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.listen(3001);
