const path = require('path')

const server = (protocol, port, should_start) => {
    return {
        protocol,
        port,
        should_start,
    }
}

const config = {
    'dev': {
        ssl: {
            cert: path.join(__dirname, '/sslcert/', 'hostcert.pem'),
            key: path.join(__dirname, '/sslcert/', 'hostkey.pem')
        },
        servers: [
            server('http', 3005, true),
            server('https', 3006, true)
        ],

        api_prefix: '/api/v1.0'
    }
}

module.exports = config.dev