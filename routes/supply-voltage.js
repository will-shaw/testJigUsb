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
        const ports = await TestJig.listPorts()
        const port = await TestJig.getPort(ports)
        const testJig = new TestJig(port)
        const result = await testJig.runTest('supply')
        .then(function(result) {
            res.send(result)
        }, function(err) {
            console.log(err)
        })
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