const TestJig = require('../controllers/TestJig')
const Server = require('../server')

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
const is_on = async (req, res) => {    
    console.log(req.path)
    const port = TestJig.getPort('6001')    
    const testJig = new TestJig(port)   
    testJig.runTest(req.path + '|').then(function(result) {
        res.send( {
            led_is_on: (result.trim() == 'true')
        })
    })
    .catch(function(err){        
        res.status(400).send(err)
    }) 
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
const on_threshold = async (req, res) => {
    const port = await TestJig.getPort('6001')    
    const testJig = new TestJig(port)
    console.log(req.path)
    testJig.runTest(req.path + '|').then(function(result) {
        res.send( {
            led_on_threshold: result.trim()
        })
    })
    .catch(function(err){        
        res.status(400).send(err)
    })     
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
const on_range = async (req, res) => {
    console.log('on_range_led')
    const port = await TestJig.getPort('6001')    
    const testJig = new TestJig(port, port.comName)
    testJig.runTest(req.path + '|').then(function(result) {
        result = result.split(" ") 
        res.send( {
            led_on_min: result[0],        
            led_on_max: result[1].trim()
        })
    })
    .catch(function(err){        
        res.status(400).send(err)
    })         
}


module.exports = (router, config) => {

    router.route('/:module/led/is_on/:name')
        .post(is_on)

    router.route('/:module/led/on_range/:name')
        .post(on_range)

    router.route('/:module/led/on_threshold/:name')
        .post(on_threshold)

}