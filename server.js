const config = require('./config')
const express = require('express')
const app = express()
const startServers = require('./start-servers')

app.use(config.api_prefix, require('./routes')(config))

const serverGenerator = startServers(app)
serverGenerator(config.servers)






