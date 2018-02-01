const SUPPLY_VOLTAGE = '/supply_voltage'
const TestJig = require('../controllers/TestJig')


/**
 *
 * @api {POST} /:module/setup/voltage/get/:name Check supply voltage
 * @apiGroup setup
 * @apiVersion 0.1.0
 *
 * @apiParam {Number} min Minimum acceptable Voltage
 * @apiParam {Number} max Maximum acceptable Voltage
 *
 * @apiSuccess {Boolean} passed Whether the setup test has passed
 *
 * @apiSuccessExample Success-Response:
 * {
 *  passed: true
 * }
 *
 */
const get_voltage = (req, res) => {

}

/**
 *
 * @api {POST} /:module/setup/led/is_on/:name Check an LED's State
 * @apiGroup setup
 * @apiVersion 0.1.0
 *
 * @apiParam {String} :name Name of led to be checked
 *
 * @apiSuccess {Boolean} passed Whether the setup test has passed
 *
 * @apiSuccessExample Success-Response:
 * {
 *  passed: true
 * }
 */
const led_is_on = (req, res) => {

}


module.exports = function(router, config) {

    router.route('/:module/setup/voltage/get/:name')
        .post(get_voltage)

    router.route('/:module/setup/led/is_on/:name')
        .post(led_is_on)
}