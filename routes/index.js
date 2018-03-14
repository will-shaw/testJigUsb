const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')
const router = express.Router()


module.exports = function(config, testJig) {
    router.use(cors())
    router.use(body_parser.json())

    router.get('/test', (req, res) => {
        console.log(`/test accessed`)
        res.send({hello_world: true})
    })

    require('./setup')(router, config, testJig)

    require('./voltage')(router, config, testJig)

    require('./led')(router, config, testJig)

    require('./test-jig-utils')(router, config)

    return router
}


