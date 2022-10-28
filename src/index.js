const { CosmWasmClient } = require("@cosmjs/cosmwasm-stargate")
const express = require("express")
const { RegistrarQueryClient } = require("kujira.js").kns.registrar

const query = require("./query.js")
const record = require("./record.js")

const port = process.env.PORT || 3000
const rpc = process.env.RPC || "https://rpc.harpoon.kujira.setten.io:443"
const registrarAddr = process.env.REGISTRAR_ADDR || "kujira1s7xhj5vf675ykgqruw70g3a7yes6eyysc8c4vmqaav0dks22cerqd3lfjy"
console.log(`using rpc ${rpc}`)
console.log(`using registrar ${registrarAddr}`)

const registrar = async () => CosmWasmClient
    .connect({ url: rpc })
    .then(client => new RegistrarQueryClient(client, registrarAddr))

const app = express()

app.get("/v1/metadata/record/:name", async (req, res, next) => {
    try {
        if (!app.locals.registrar) {
            app.locals.registrar = await registrar()
        }
        const name = req.params.name
        const info = await query.record(app.locals.registrar, name)
        res.send(
            record.metadata(name, info.token_uri, info.extension.expiration)
        )
    } catch (err) {
        next(err)
    }
})

app.get("/v1/image/record/:name", async (req, res, next) => {
    try {
        if (!app.locals.registrar) {
            app.locals.registrar = await registrar()
        }
        const name = req.params.name
        const info = await query.record(app.locals.registrar, name)
        res.send(
            record.image(name, info.extension.expiration)
        )
    } catch (err) {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if (err.message.includes("cw721_base::state::TokenInfo<kns_registrar::state::RecordInfo> not found")) {
        res.status(404).send("record not found")
    } else {
        res.status(500).send("unexpected error")
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
