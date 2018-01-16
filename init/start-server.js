const http = require('http')
const https = require('https')
const credentials = require('../config/sslcert/index')

module.exports = function(app, options) {
    let server
    switch (options.protocol) {
        case 'http':
            server = http.createServer(app)
            break;
        case 'https':
            server = https.createServer(credentials, app)
            break;
    }
    server.listen(options.port)
    console.log(`${options.protocol} server listening on port ${options.port}`)
    return server

}