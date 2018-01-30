const SUPPLY_VOLTAGE = '/supply_voltage'
const TestJig = require('../controllers/TestJig')


/**
 *
 * @api {POST} /:module/setup/supply_voltage Check supply voltage
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
const supply_voltage = (req, res) => {

}

/**
 *
 * @api {POST} /:module/setup/led/:name/is_on Check an LED's State
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

    router.route('/:module/setup/supply_voltage')
        .post(supply_voltage)

    router.route('/:module/setup/led/:name/is_on')
        .post(led_is_on)
}