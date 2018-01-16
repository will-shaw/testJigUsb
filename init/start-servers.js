const startServer = require('./start-server')

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
    return function(servers) {
        return servers.map(options => {
            return startServer(app, options)
        })
    }
}