const config = require('./config')
const express = require('express')
const app = express()
const { startServer } = require('./init')

app.use(config.api_prefix, require('./routes')(config))

startServer(app, config.servers.https)

app.use(function(err, req, res, next) {
    logger.error(err.stack)

    if( req.timedout ) {
        res.status(500).send('Request timed out.')
    } else {
        res.status(500).send('Something broke!')
    }
});

module.exports = app








