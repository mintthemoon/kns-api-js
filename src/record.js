const chunkSize = 20

const chunkStr = (str, len) => str.match(new RegExp(`.{1,${len}}`, "g"))

const dateFromEpoch = (epoch) => new Date(epoch * 1000).toUTCString()

const svgName = (name) => {
    if (name.length <= chunkSize) {
        return `<tspan x=\"4\">${name}</tspan>`
    } else {
        const chunks = chunkStr(name, chunkSize)
        const topRow = `<tspan x=\"4\" dy=\"-${chunks.length - 1}em\">${chunks[0]}</tspan>`
        return topRow.concat(chunks.slice(1)
            .map((chunk) => `<tspan x=\"4\" dy=\"1em\">${chunk}</tspan>`)
            .reduce((x, y) => x.concat(y))
        )
    }
}

const image = (name, expiration) => {
    const valid = `valid until ${dateFromEpoch(expiration)}`
    const nameSvg = svgName(name)
    return `<?xml version="1.0" encoding="UTF-8"?><svg width="600" height="600" viewBox="0 0 130 130" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="kns"><rect id="Rectangle" fill="#263238" x="0" y="0" width="130" height="130"></rect><text y="16" x="10" font-family="Roboto, Verdana, sans-serif" font-size="10" letter-spacing="0.1" fill="#fff">KUJIRA NAME SYSTEM</text><path transform="translate(25, 25)" d="M40 0A40 40 0 1 1 0 40 40 40 0 0 1 40 0Zm21 30H40.63v14.8H49v14c0 1.31-.52 2-1.57 2a29.89 29.89 0 0 1-3.72-.27l.73 3.5h4.26c2.62 0 4-1.46 4-4.33V44.8H61ZM18.62 52.47a33.58 33.58 0 0 1-2.15 10l2.88.88a40.57 40.57 0 0 0 2.1-10.54Zm7.13.16-2.52.31c.26 2.29.42 5.58.53 9.81l2.72-.32a81.85 81.85 0 0 0-.73-9.8Zm16.45-4.39a57.26 57.26 0 0 1-5.76 12.21l2.83 2a59.58 59.58 0 0 0 6-12.79Zm-11.84 4-2.62.31A33.64 33.64 0 0 1 29.36 62l2.73-.32a37 37 0 0 0-1.73-9.42ZM58 48l-2.8 1.7a97.32 97.32 0 0 1 6 11.9l2.8-1.93A100.11 100.11 0 0 0 58 48Zm-22.82 3.74-2.46.73a65.55 65.55 0 0 1 2.2 6.47l2.56-.63a52.2 52.2 0 0 0-2.3-6.57ZM23.34 16.1A28.53 28.53 0 0 1 16 28.52l.79 3.71c.68-.63 1.36-1.26 2-1.93v20.19H36V28.83h-5.3a39.94 39.94 0 0 0 3.31-6v-2.5h-8.63c.47-1 .89-2.09 1.31-3.18Zm9.43 25v6.21h-3.83v-6.16Zm-6.87 0v6.21H22v-6.16Zm31.55-7.83v8.19H44.19v-8.14ZM25.9 31.91v6.21H22v-6.21Zm6.87 0v6.21h-3.83v-6.21Zm-2.25-8.61a52.08 52.08 0 0 1-3.41 5.53h-7a41.84 41.84 0 0 0 3.82-5.53ZM51 16l-3.61.63c.61 1.56 1.26 3.37 1.83 5.27H37.85v3.39h25.68V21.9H52.79c-.58-2.2-1.16-4.13-1.79-5.9Z" fill="#e53935"></path><text y="91%" font-family="Roboto Mono, Courier New, monospace" font-size="10" fill="#fff"><tspan x="4">${nameSvg}</tspan></text><text x="4" y="96%" font-family="Roboto, Verdana, sans-serif" font-size="5" fill="#607d8b">${valid}</text></g></svg>`
}

const metadata = (name, url, expiration) => {
    return {
        name: name,
        description: `This token represents ownership of the KNS Domain ${name}. Valid until ${dateFromEpoch(expiration)}.`,
        image: url.replace("metadata", "image"),
        attributes: {
            display_type: "date",
            trait_type: "Expiration",
            value: Number(expiration),
        }
    }
}

module.exports = { image, metadata }