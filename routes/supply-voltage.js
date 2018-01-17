const SUPPLY_VOLTAGE = '/supply_voltage'
const TestJig = require('../controllers/TestJig')

/**
 * Routes following .../tag_options
 * @param router the express router
 * @param config config file
 */
module.exports = function(router, config) {

    console.log(`try accessing localhost:3005${config.api_prefix}${SUPPLY_VOLTAGE}`)

    router.post(SUPPLY_VOLTAGE, function(req, res) {
        console.log(`received request to ${SUPPLY_VOLTAGE}`)
        res.status(200).send({hi: 'hello_world'})
    })

    router.get('/ports', async function(req, res) {
        const ports = await TestJig.listPorts()
        res.send(ports)
    })
}