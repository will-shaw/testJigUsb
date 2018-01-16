const SerialPort = require('serialport')

class TestJigFactory {

}

class TestJig {
    constructor (port) {
        this.port = port
        this.serialPort = new SerialPort(this.port, {
            baudrate: 9600,
            autoOpen: false
        })

        if (!this.serialPort) throw new Error(`could not create serial comm at port ${this.port}`)


    }

    static async listPorts () {
        return await SerialPort.list()
    }

    runTest(key) {

    }
}

module.exports = TestJig