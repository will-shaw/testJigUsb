const TestJig = require('../controllers/TestJig')


/**
 *
 * @api {POST} /:module/voltage/get/:name Get the voltage
 * @apiGroup voltage
 * @apiVersion 0.1.0
 *
 *
 * @apiSuccess {Number} get_voltage Voltage of a given test point
 *
 * @apiSuccessExample Success-Response:
 * {
 *  get_voltage: 48
 * }
 */
const get_voltage = async (req, res) => {
    console.log('get_voltage')
    const port = await TestJig.getPort('6001')    
    const testJig = new TestJig(port)   
    testJig.runTest(req.path + '|').then(function(result) {
        res.send( {
            get_voltage: result.trim()
        })
    })
    .catch(function(err){        
        res.status(400).send(err)
    }) 
}

/**
 *
 * @api {POST} /:module/voltage/set/:name/:value Set voltage in a given point (/:name)
 * @apiDescription Sets the voltage set point to the specified voltage and reads it back:
 * @apiGroup voltage
 * @apiVersion 0.1.0
 *
 * @apiSuccess {Number} feedback FeedBack voltage
 *
 * @apiSuccessExample Success-Response:
 * {
 *  feedback: 1.5,
 * }
 */
const set_voltage = async (req, res) => {
    console.log('set_voltage')
    const port = await TestJig.getPort('6001')       
    const testJig = new TestJig(port)
    testJig.runTest(req.path + '|').then(function(result) {
        res.send( {
            feedback: result.trim()
        })
    })
    .catch(function(err){        
        res.status(400).send(err)
    })
}

/**
 *
 * @api {POST} /:module/voltage/get/load Get the load voltage values
 * @apiGroup voltage
 * @apiVersion 0.1.0
 *
 *
 * @apiSuccess {Number} load_avg Average load voltage
 * @apiSuccess {Number} load_min Minimum load voltage
 * @apiSuccess {Number} load_max Maximum load voltage
 *
 * @apiSuccessExample Success-Response:
 * {
 *  load_avg: 1.668
 *  load_min: 1.551
 *  load_max: 1.884
 * }
 */
const get_voltage_load = async (req, res) => {
    console.log('get_voltage_load')
    const port = await TestJig.getPort('6001')    
    const testJig = new TestJig(port, port.comName)    
    testJig.runTest(req.path + '|').then(function(result) {
        result = result.split(" ");
        res.send( {
            load_avg: result[0],
            load_min: result[1],
            load_max: result[2].trim(),
        })
    })
    .catch(function(err){        
        res.status(400).send(err)
    })
}


module.exports = function(router, config) {

    //console.log(`try accessing localhost:3005${config.api_prefix}${VOLTAGE}`)

    router.route('/:module/voltage/get/load')
        .post(get_voltage_load)    

    router.route('/:module/voltage/get/:name')
        .post(get_voltage)

    router.route('/:module/voltage/set/:name/:value')
        .post(set_voltage)

}