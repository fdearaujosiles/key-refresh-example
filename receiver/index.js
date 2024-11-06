const express = require('express');
const router = require('./router');
const { RECEIVER_PORT } = require('../constants');

const app = express();

app.use('/', router);

app.listen(RECEIVER_PORT, () => {
    console.log("Receiver INIT on port " + RECEIVER_PORT);
    
})