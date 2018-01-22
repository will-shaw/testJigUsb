const SerialPort = require('serialport')

var port

class TestJigFactory {

}

class TestJig {
    constructor (port) {
        this.port = port        

        this.serialPort = new SerialPort(this.port.comName, {
            baudRate: 9600
        })

        if (!this.serialPort) throw new Error(`could not create serial comm at port ${this.port.comName}`)
    }
    

    static async listPorts () {
        return SerialPort.list()
    }

    static async getPort(ports, productId = '6001') {
        return ports.find(x => x.productId == productId)
    }    

    async runTest(key) {   
        const serialPort = this.serialPort;                                    
        return new Promise(function(resolve, reject) {
            var serialMsg = ''
            serialPort.write(key)            
            serialPort.on('readable', function () {			                            
                serialMsg += serialPort.read().toString();                
                if(serialMsg.includes('\n')){
                    console.log(serialMsg)
                    this.close()                
                    // convert value ???                    
                    resolve(serialMsg)
                } else if (serialMsg.length == 0){
                    reject(Error('No message received'))
                }                
            })            
        });        
    }   
}

module.exports = TestJig