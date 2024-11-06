try {
    const dotenv = require('dotenv');
    dotenv.config()
} catch(e) {}

const RECEIVER_URL = process.env.RECEIVER_URL;
const RECEIVER_PORT = process.env.RECEIVER_PORT;

const SENDER_URL = process.env.SENDER_URL;
const SENDER_PORT = process.env.SENDER_PORT;

const REFRESH_TIME = 1000 * 5;

module.exports = {
    REFRESH_TIME,
    RECEIVER_URL,
    SENDER_URL,
    RECEIVER_PORT,
    SENDER_PORT
}