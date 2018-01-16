const http = require('http')
const https = require('https')
const credentials = require('./config/sslcert')

/**
 * Takes an express app and returns a function
 * Which can generate servers based on the following object:
 * {
 *      should_start: boolean (whether server should be started)
 *      protocol: string (protocol of server)
 *      port: int (port server will run on)
 *  }
 * @param app express app
 * @returns {Function} which can generate servers when a list of options is passed in
 */
module.exports = (app) => {
    return function(server_options) {
        server_options.forEach(options => {
            let server
            if (options.should_start) {
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
            }
        })
    }
}