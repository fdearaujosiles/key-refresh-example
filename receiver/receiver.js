const { REFRESH_TIME } = require("../constants")

let keyStore = {}

function initSignal(req, res) {
    res.send(initKey())
}

function answerSignal(req, res) {
    let auth = false;
    if(req.query?.key && keyStore[req.query.key]?.auth) {
        auth = updateRefreshInterval(req.query.key)
    }

    res.send(auth)
}

function initKey() {
    const key = Number(Math.random() * 1000000).toFixed();
    keyStore[key] = {
        auth: true,
        interval: setInterval(() => removeAuth(key), REFRESH_TIME)
    };

    console.log("Init key " + key)

    return {key}
}

function removeAuth(key) {
    clearInterval(keyStore[key].interval)
    keyStore[key] = undefined
    console.log("Removed key " + key)
}

function updateRefreshInterval(key) {
    if(keyStore[key]?.auth) {
        removeAuth(key)
        const newKey = initKey()
        console.log("Updated key " + key + " to " + newKey.key)
        return newKey
    } else {
        console.log("Tried to update invalid key" + key)
        return false
    }
}

module.exports = {answerSignal, initSignal}