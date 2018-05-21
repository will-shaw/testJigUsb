const SerialPort = require('serialport')

class TestJig {
    constructor () {
        this.port = null
        this.serialPort = null
        this.queue = []
    }

    getComName(){
        return this.port.comName
    }

    getSerialPort(){
        return this.serialPort
    }

    static async createSerialPort(comName, options) {
        const default_options = {
            baudRate: 9600
        }
        const merged_options = Object.assign(default_options, options)
        return new SerialPort(comName, merged_options)

    }

    static async listPorts () {
        return SerialPort.list()
    }

    static async getPortFromComName(comName){
        const ports = await this.listPorts()
        return ports.find(x => x.comName === comName)
    }

    async getPort(productId = '6001') {
        const ports = await this.listPorts()

        return ports.find(x => x.productId == productId)
    }

    async setPort(productId = '6001') {
        const ports = await SerialPort.list()

        this.port = ports.find(x => x.productId == productId)
    }

    waitForComPort(testJig) {

        return new Promise(function (resolve, reject){
            var i = 10; // total waiting time in seconds for COM port to be available

            function delay1s () {
                setTimeout(function () {
                    i--;
                    if (i < 1) {
                        testJig.serialPort = null
                        reject('time out (10s)')
                    } else if (testJig.serialPort != null) {
                        delay1s()
                    } else {
                        resolve()
                    }
                }, 1000)
            }

            delay1s();
        })
    }

    async runTest(key, testJig) {

        return new Promise(function (resolve, reject) {

            testJig.serialPort = new SerialPort(testJig.port.comName, {
                baudRate: 9600,
                autoOpen: false
            });

            let index = testJig.queue.indexOf(key.substring(0, key.length - 1))
            if(index == -1){
                testJig.queue = []
                testJig.serialPort = null
                reject('Test is not in the queue')
            } else {
                //console.log(testJig.queue[0])
                key = testJig.queue[index]+'|'
                testJig.queue.splice(index, 1)
            }

            testJig.serialPort.open(function (err) {
                if (err) {
                    testJig.serialPort = null
                    reject('Error opening port: ' + err.message.toString())
                }

                let testResult = ''
                // console.log('Adding')
                testJig.serialPort.on('data', function (data) {
                    testResult += data.toString()
                    if(testResult.includes('\n')){
                        testJig.serialPort.close()
                        //console.log(testResult + testJig.queue.length)
                        testJig.serialPort = null;
                        resolve(testResult)
                    } else if (testResult.length == 0){
                        console.log('Error: No Message receivedPromise')
                        testResult = ''
                        testJig.serialPort.close()
                        testJig.serialPort = null
                        reject('No Message received')
                    }
                });

                // console.log('Writing')
                testJig.serialPort.write(key, () => {
                    console.log('Completed')
                })
                // console.log(key)
            });


            testJig.serialPort.on('error', function(err) {
                //testJig.serialPort.close()
                testJig.serialPort = null
                reject(new Error(err.message).toString())
            })


        });

    }

}

module.exports = TestJig
