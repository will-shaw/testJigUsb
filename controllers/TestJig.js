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

    async getPort(productId = '5740') {
        const ports = await this.listPorts()

        return ports.find(x => x.productId == '5740')
    }

    async setPort(productId = '5740') {
        const ports = await SerialPort.list()
        this.port = ports.find(x => (x.productId == '5740'))
    }

    waitForComPort(testJig) {

        return new Promise(function (resolve, reject){

            var counter = 0          

            function delay () {                

                setTimeout(function () {
                    if (counter > 10000) { // total delay in ms
                        testJig.serialPort = null
                        console.log('Timeout: com port')
                        reject('-1')
                    } else if (testJig.serialPort != null) {
                        counter += 250 
                        delay()
                    } else {
                        resolve()
                    }
                }, 250)
            }

            delay();
        
        })
        
    }

    async runTest(key, testJig) {

        return new Promise(function (resolve, reject) {

            testJig.serialPort = null
            testJig.serialPort = new SerialPort(testJig.port.comName, { 
                autoOpen: false,               
                baudRate: 9600,
                dataBits: 8,
                parity: "none",
                stopBits: 1
            });            

            let index = testJig.queue.indexOf(key.substring(0, key.length - 1))
            if(index == -1){
                testJig.queue = []
                testJig.serialPort = null
                console.log('Something broke in the test queue')
                reject('-2')
            } else {
                //console.log(testJig.queue[0])
                key = testJig.queue[index]+'|'
                testJig.queue.splice(index, 1)
            }

            // var tempQueue = testJig.queue
            // function abrir(){                
            //     testJig.serialPort = null
            //     testJig.serialPort = new SerialPort(testJig.port.comName, { 
            //         autoOpen: false,               
            //         baudRate: 9600,
            //         dataBits: 8,
            //         parity: "none",
            //         stopBits: 1,
            //     });

            //     testJig.serialPort.open(function (err) {
            //         if (err) {
            //             //testJig.serialPort = null
            //             //testJig.serialPort.close()
            //             console.log('Error opening the COM port -> ' + err.message)                           
            //             //reject('-3')
            //         } else {
            //             testJig.queue = tempQueue
            //             return;
            //         }
            //         setTimeout(abrir, 2000); // next attempt to open after 2s
            //     });
            // }

            testJig.serialPort.open(function (err) {
                if (err) {
                    testJig.serialPort = null
                    //testJig.serialPort.close()
                    console.log('Error opening the COM port -> ' + err.message)   
                    //abrir()                        
                    reject('-3')
                }
            
            
                let testResult = ''
                testJig.serialPort.on('data', function (data) {
                    testResult += data.toString()
                    if(testResult.includes('\n')){
                        testJig.serialPort.close()
                        //console.log(testResult)
                        testJig.serialPort = null;
                        resolve(testResult)
                    } else if (testResult.length == 0){
                        testResult = ''
                        testJig.serialPort.close()
                        testJig.serialPort = null
                        console.log('No Message received')
                        reject('-4')
                    }
                });

                testJig.serialPort.write(key, () => {
                    console.log(key)
                })
            });
            


            testJig.serialPort.on('error', function(err) {
                testJig.serialPort.close()
                testJig.serialPort = null
                console.log('SerialPort.on Error')
                reject('-5')
            })

        });

    }

}

module.exports = TestJig
