const VOLTAGE = '/voltage'
const TestJig = require('../controllers/TestJig')


/**
 *
 * @api {POST} /:module/voltage/get/:name Check the supply Voltage
 * @apiGroup supply_voltage
 * @apiVersion 0.1.0
 *
 *
 * @apiSuccess {Number} supply_voltage Supply Voltage of a given module
 *
 * @apiSuccessExample Success-Response:
 * {
 *  suppy_voltage: 50
 * }
 */
const get_voltage = async (req, res) => {
    console.log('sending msg to TestJig')
    const port = await TestJig.getPort('6001')
    const serialPort = TestJig.createSerialPort(port.comName)
    const testJig = new TestJig(port, serialPort)
    const result = await testJig.runTest(req.params.name)
    res.send(result)
}

/**
 *
 * @api {POST} /:module/voltage/set/:name Set the Setpoint Voltage
 * @apiDescription Sets the voltage set point to the specified voltage and reads it back:
 * @apiGroup setpoint
 * @apiVersion 0.1.0
 *
 * @apiSuccess {Number} feed_back FeedBack Voltage
 * @apiSuccess {Number} load_average The Load Average
 * @apiSuccess {Number} load_min_value Load Min Value
 * @apiSuccess {Number} load_max_value Load Max Value
 *
 * @apiSuccessExample Success-Response:
 * {
 *  feed_back: 0.007,
 *  load_average: 0.007,
 *  load_min_value: 0,
 *  load_max_value: 0.114,
 * }
 */
const setpoint_voltage = async (req, res) => {

}

module.exports = function(router, config) {

    console.log(`try accessing localhost:3005${config.api_prefix}${VOLTAGE}`)

    router.route('/:module/voltage/get/:name')
        .post(supply_voltage)

    router.route('/:module/voltage/set/:name')
        .post(setpoint_voltage)

}