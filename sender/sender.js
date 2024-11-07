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
        const key = await fetchJson(RECEIVER_URL + "init")
        return key
    }

    async sendSignal(key) {
        const newKey = await fetchJson(RECEIVER_URL + "auth?key=" + key)
        if(newKey) {
            this.key = newKey
            this.updateTimeout()
        } else {
            this.init()
        }
    }

    updateTimeout() {
        this.timeout = setTimeout(() => this.sendSignal(this.key), REFRESH_TIME + (500 * (Math.random() > 0.9 ? 1 : -1)));
    }
}

async function fetchJson(url) {
    try {
        return await (await fetch(url)).json()
    } catch(err) {
        if(err instanceof TypeError && err.message === "fetch failed") {
            return null;
        } else {
            throw err;
        }
    }
}

module.exports = { Signal }