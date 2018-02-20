const TestJig = require('../controllers/TestJig')
const Server = require('../init/start-server')

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
const led_is_on = async (req, res) => {
    
    console.log(req.path)
    const port = await TestJig.getPort('6001')    
    const testJig = new TestJig(port)   
    console.log(0)     
    await testJig.runTest(req.path + '|').then(function(result) {
        res.send( {
            passed: (result.trim() == 'true')
        })
    })
    .catch(function(err){        
        res.status(400).send(err)
    }) 
}

/**
 *
 * @api {POST} /:module/setup/no No setup phase
 * @apiGroup setup
 * @apiVersion 0.1.0
 *
 * @apiParam {String} :no param
 *
 * @apiSuccess {Boolean} this route will always return true
 *
 * @apiSuccessExample Success-Response:
 * {
 *  passed: true
 * }
 */
const no_setup = (req, res) => {    
    res.send({
        passed: true
    })
}


module.exports = function(router, config) {

    router.route('/:module/setup/no')
        .post(no_setup)

    router.route('/:module/setup/led/is_on/:name')
        .post(led_is_on)
}