const LRU = require("lru-cache")

const options = {
    max: 1000,
    ttl: 180000,  // 3m
    allowStale: false,
}

const cache = new LRU(options)

const record = async (registrar, name) => {
    if (cache.has(name)) {
        return cache.get(name)
    } else {
        return registrar
            .nftInfo({ tokenId: name })
            .then(nftInfo => {
                cache.set(name, nftInfo)
                return nftInfo
            })
    }
}

module.exports = { record }