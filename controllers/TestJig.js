const SerialPort = require('serialport')

var port


class TestJig {
    constructor (port, serialPort) {
        this.port = port
        this.serialPort = serialPort

        if (!this.serialPort) throw new Error(`could not create serial comm at port ${this.port.comName}`)
    }

    getComName(){
        return this.port.comName
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

    static async getPort(productId = '6001') {
        const ports = await this.listPorts()
        return ports.find(x => x.productId == productId)
    }

    async runTest(key) {
        return new Promise((resolve, reject) => {
            let serialMessage = ''
            this.serialPort.write(key)
            this.serialPort.on('readable', () => {
                serialMessage += this.serialPort.read().toString()
                if (serialMessage.includes('\n')){
                    console.log(serialMessage)
                    this.serialPort.close()
                    resolve(serialMessage)
                } else if (serialMessage.length === 0) {
                    reject(new Error('No Message received'))
                }
            })
        })
    }   
}

module.exports = TestJig