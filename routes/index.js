const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')
const router = express.Router()


module.exports = function(config) {
    router.use(cors())
    router.use(body_parser.json())

    require('./supply_voltage')(router)

    router.get('/', (req, res) => {
        res.send('hello world')
    })

    return router
}


