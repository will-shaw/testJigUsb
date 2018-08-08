const config = require('./config')
const express = require('express')
const app = express()
const { startServer } = require('./init')
const cors = require('cors')
const body_parser = require('body-parser')


app.use(cors());

app.use(body_parser.json())

app.use(body_parser.urlencoded({
    extended: true
}))

app.use('/api/v1.0', require('./routes/index'))

app.use(function(err, req, res, next) {
    logger.error(err.stack)

    if( req.timedout ) {
        res.status(500).send('Request timed out.')
    } else {
        res.status(500).send('Something broke!')
    }
});

startServer(app, config.servers.http) 

module.exports = app
