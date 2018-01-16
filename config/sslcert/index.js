const fs = require('fs')
const config = require('../../config')

module.exports = {
    key: fs.readFileSync(config.ssl.key, 'utf8'),
    cert: fs.readFileSync(config.ssl.cert, 'utf8')
}