const path = require('path')

const server = (protocol, port) => {
    return {
        protocol,
        port,
    }
}

const config = {
    'dev': {
        ssl: {
            cert: path.join(__dirname, '/sslcert/', 'hostcert.pem'),
            key: path.join(__dirname, '/sslcert/', 'hostkey.pem')
        },
        servers: {
            http: server('http', 3005),
            https: server('https', 3006)
        },
        api_prefix: '/api/v1.0'
    },
}

module.exports = config.dev