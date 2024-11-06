const { REFRESH_TIME, RECEIVER_URL } = require("../constants")

class Signal {
    constructor() {
        this.init();
    }

    async init() {
        this.key = await this.getKey();
        this.updateTimeout()
    }
    
    async getKey() {
        console.log("\n\nAsked for a new key")
        const key = (await (await fetch(RECEIVER_URL + "init")).json()).key
        console.log("Got key " + key)
        return key
    }

    async sendSignal(key) {
        console.log("Sending refresh request for key " + key)
        const resp = await (await fetch(RECEIVER_URL + "auth?key=" + key)).json()
        if(resp.key) {
            console.log("Key " + key + " refreshed succesfully!")
            console.log("New key " + resp.key)
            this.key = resp.key
            this.updateTimeout()
        } else {
            console.log("Key " + key + " is not authorized")
            this.init()
        }
    }

    updateTimeout() {
        this.timeout = setTimeout(() => this.sendSignal(this.key), REFRESH_TIME + (500 * (Math.random() > 0.9 ? 1 : -1)));
    }
}

module.exports = { Signal }