
/**
 *
 * @api {POST} /:module/led/is_on/:name Check an LED's State
 * @apiDescription Check whether the given LED is on
 * @apiGroup led
 * @apiVersion 0.1.0
 *
 *
 * @apiSuccess {Boolean} on Whether the LED is on
 *
 * @apiSuccessExample Success-Response:
 * {
 *  on: true
 * }
 *
 */
const is_on = (req, res) => {

}

/**
 *
 * @api {POST} /:module/led/on_threshold/:name LED's on threshold
 * @apiDescription Checks the voltage at which a specified LED turns on
 * @apiGroup led
 * @apiVersion 0.1.0
 *
 *
 * @apiSuccess {Boolean} on_threshold On threshhold for the LED
 *
 * @apiSuccessExample Success-Response:
 * {
 *  on_threshold: true
 * }
 *
 */
const on_threshold = (req, res) => {

}


/**
 *
 * @api {POST} /:module/led/on_range/:name LED's on range
 * @apiDescription Checks the voltages at which an LED is on for
 * @apiGroup led
 * @apiVersion 0.1.0
 *
 *
 * @apiSuccess {Number} on_min Minimum Voltage at which the the LED is on
 * @apiSuccess {Number} on_max Maximum Voltage at which the the LED is on
 *
 * @apiSuccessExample Success-Response:
 * {
 *  on_min: true,
 *  on_max: true
 * }
 *
 */
const on_range = (req, res) => {

}


module.exports = (router, config) => {

    router.route('/:module/led/is_on/:name')
        .post(is_on)

    router.route('/:module/led/on_range/:name')
        .post(on_range)

    router.route('/:module/led/on_threshold/:name')
        .post(on_threshold)

}