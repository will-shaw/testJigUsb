const TestJig = require('../controllers/TestJig')

module.exports = function(router, config, testJig) {

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
    //const get_voltage = (req, res) => {

    //}

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
        testJig.queue.push(req.path)
        await testJig.setPort('6001')                                
        testJig.waitForComPort(testJig).then(function(result){                        
            testJig.runTest(req.path + '|', testJig).then(function(result) {                
                res.send( {
                    passed: (result == 'true\n')
                })              
            })
            .catch(function(err){                       
                res.status(400).send(err)
            }) 
        })
        .catch(function(timeOut){            
            res.status(400).send(timeOut) //COM port is busy // maybe is necessary to use fail: 'false' in here
        })           
    }
    
    /**
     *
     * @api {POST} /:module/setup/voltage/set/:name/:value Set voltage in a given point (/:name)
     * @apiDescription Sets the voltage set point to the specified voltage and reads it back:
     * @apiGroup voltage
     * @apiVersion 0.1.0
     *
     * @apiSuccess {Number} feedback FeedBack voltage
     *
     * @apiSuccessExample Success-Response:
     * {
     *  passed: 1.5
     * }
     */
    const voltage_set = async (req, res) => {
        testJig.queue.push(req.path)
        await testJig.setPort('6001')                                
        testJig.waitForComPort(testJig).then(function(result){                                
            testJig.runTest(req.path + '|', testJig).then(function(result) {                
                res.send( {
                    passed: true // TO DO validate if voltage has been set or not
                })               
            })
            .catch(function(err){                       
                res.status(400).send(err)
            }) 
        })
        .catch(function(timeOut){
            res.status(400).send(timeOut) //COM port is busy
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
        //testJig.queue.push(req.path)
        res.send({
            passed: true
        })         
    }

    
    router.route('/:module/setup/no')
        .post(no_setup)

    router.route('/:module/setup/led/is_on/:name')
        .post(led_is_on)

    router.route('/:module/setup/voltage/set/:name/:value')
        .post(voltage_set)    
}