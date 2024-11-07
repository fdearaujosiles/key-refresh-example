const { REFRESH_TIME } = require("../constants")

let keyStore = {}

function initKey() {
    const key = Number(Math.random() * 1000000).toFixed();
    keyStore[key] = {
        auth: true,
        interval: setInterval(() => removeAuth(key), REFRESH_TIME)
    };

    return key
}

function answerSignal(req, res) {
    let auth = false;
    if(req.query?.key && keyStore[req.query.key]?.auth) {
        auth = updateRefreshInterval(req.query.key)
    }

    res.send(auth)
}

function removeAuth(key) {
    clearInterval(keyStore[key].interval)
    keyStore[key] = undefined
}

function updateRefreshInterval(key) {
    if(keyStore[key]?.auth) {
        removeAuth(key)
        const newKey = initKey()
        return newKey
    } else {
        return false
    }
}

module.exports = {answerSignal, initKey}