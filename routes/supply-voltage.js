const SUPPLY_VOLTAGE = '/supply_voltage'
const TestJig = require('../controllers/TestJig')

/**
 * Routes following .../tag_options
 * @param router the express router
 * @param config config file
 */
module.exports = function(router, config) {

    console.log(`try accessing localhost:3005${config.api_prefix}${SUPPLY_VOLTAGE}`)

    router.get('/supply', async function(req, res){
        console.log('sending msg to TestJig')
        const port = await TestJig.getPort('6001')
        const serialPort = TestJig.createSerialPort(port.comName)
        const testJig = new TestJig(port, serialPort)
        const result = await testJig.runTest('supply')
        res.send(result)
    })

    router.post(SUPPLY_VOLTAGE, async function(req, res) {
        console.log(`received request to ${SUPPLY_VOLTAGE}`)
        res.status(200).send({hi: 'hello_world'})
    })

    router.get('/ports', async function(req, res) {
        const ports = await TestJig.listPorts()
        res.send(ports)
    })
}