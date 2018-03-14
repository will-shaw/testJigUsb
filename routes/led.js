const TestJig = require('../controllers/TestJig')

module.exports = (router, config, testJig) => {
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
     *  led_is_on: true
     * }
     *
     */
    const is_on = async (req, res) => {   
        testJig.queue.push(req.path)
        await testJig.setPort('6001')                                
        testJig.waitForComPort(testJig).then(function(result){                        
            testJig.runTest(req.path + '|', testJig).then(function(result) {                
                res.send( {
                    led_is_on: (result == 'true\n')
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
     *  led_on_threshold: 2.5
     * }
     *
     */
    const on_threshold = async (req, res) => {       
        testJig.queue.push(req.path)
        await testJig.setPort('6001')                                
        testJig.waitForComPort(testJig).then(function(result){                        
            testJig.runTest(req.path + '|', testJig).then(function(result) {                
                res.send( {
                    led_on_threshold: result.trim()
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
     *  on_min: 0.05,
     *  on_max: 4.5
     * }
     *
     */
    const on_range = async (req, res) => {
        testJig.queue.push(req.path)
        await testJig.setPort('6001')                                
        testJig.waitForComPort(testJig).then(function(result){                        
            testJig.runTest(req.path + '|', testJig).then(function(result) {                
                result = result.split(" ") 
                res.send( {
                    led_on_min: result[0],        
                    led_on_max: result[1].trim()
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



    router.route('/:module/led/is_on/:name')
        .post(is_on)

    router.route('/:module/led/on_range/:name')
        .post(on_range)

    router.route('/:module/led/on_threshold/:name')
        .post(on_threshold)

}