const express = require('express');
const { Signal } = require('./sender');
const { SENDER_PORT } = require('../constants');

const app = express();

app.listen(SENDER_PORT, () => {
    console.log("Sender INIT on port " + SENDER_PORT);
    new Signal();
})