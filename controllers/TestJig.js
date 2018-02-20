const SerialPort = require('serialport')

//var port


class TestJig {
    constructor (port) {
        console.log(1)
        this.port = port     
        console.log(2)   
        this.serialPort = new SerialPort(port.comName, {
            baudRate: 9600,
            autoOpen: false
        });
        console.log(3)

        if (!this.serialPort) throw new Error(`could not create serial comm at port ${this.port.comName}`)
    }

    // getComName(){
    //     return this.port.comName
    // }

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

    static async getPort(productId = '6001') {
        const ports = await this.listPorts()
        var index
        for (var i in ports) {
            if(ports[i].productId == productId){
                index = i
            }
        }            
        while(ports[index].isOpen);
        setTimeout(function(){ return ports[index]; }, 2000)

        
        //return ports.find(x => x.productId == productId) //
    }

    runTest(key) {          
        return new Promise((resolve, reject) => {            
            let serialMessage = ''
            if(!this.serialPort.isOpen) this.serialPort.open()
            this.serialPort.write(key)
            this.serialPort.on('readable', () => {
                serialMessage += this.serialPort.read().toString()
                if (serialMessage.includes('\n')){                    
                    this.serialPort.close()                    
                    console.log(serialMessage)
                    resolve(serialMessage)
                } else if (serialMessage.length === 0) {
                    console.log('Error: No Message received')
                    this.serialPort.close()
                    reject(new Error('No Message received'))
                }
            })
            console.log('???')            
        })
        

    }   
}

module.exports = TestJig