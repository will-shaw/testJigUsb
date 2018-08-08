const express = require('express')
const router = express.Router()

const TestJig = require('../controllers/TestJig')
const testJig = new TestJig()

router.all('/:module/:group/:name/:point/:value', async (req, res) => {

    console.log(req.path)    

    testJig.queue.push(req.path)
    await testJig.setPort('6001')
    testJig.waitForComPort(testJig).then(function (result) {
        testJig.runTest(req.path + '|', testJig).then(function (result) {
            //console.log(req.path)

            result = result.split(" ");

            let data = {}

            let count = 1;

            result.map(item => {

                item = item.trim();
                item = isNaN(item) ? item : parseFloat(item);
                item = item === 'false' ? false : item;
                item = item === 'true' ? true : item;                                
                 
                data[`prop${count++}`] = item;

            })     

            console.log(data);

            res.send(data)

        })
            .catch(function (err) {
                let data = {
                    prop1: false
                }
                console.log('err' + err)
                res.send(data)
            })
    })
        .catch(function (timeOut) {
            let data = {
                prop1: false
            }
            console.log(timeOut)
            res.send(data)
        })

    // res.send();

})

router.all('/:module/:group/:name/:point', async (req, res) => {

    //console.log(req.path)

    testJig.queue.push(req.path)
    await testJig.setPort('5740')
    testJig.waitForComPort(testJig).then(function (result) {
        testJig.runTest(req.path + '|', testJig).then(function (result) {
            //console.log(req.path)

            result = result.split(" ");

            let data = {}

            let count = 1;

            result.map(item => {

                item = item.trim();
                item = isNaN(item) ? item : parseFloat(item);
                item = item === 'false' ? false : item;
                item = item === 'true' ? true : item;                                
                 
                data[`prop${count++}`] = item;

            })

            console.log(data);

            res.send(data)

        })
            .catch(function (err) {
                let data = {
                    prop1: false
                }
                console.log('err' + err)
                res.send(data)
            })
    })
        .catch(function (timeOut) {
            let data = {
                prop1: false
            }
            console.log(timeOut)
            res.send(data)
        })

    // res.send();

})

module.exports = router;