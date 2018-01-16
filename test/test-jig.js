const TestJig = require('../controllers/TestJig')
const SerialPort = require('serialport/test')
const MockBinding = SerialPort.Binding

describe('function the test jig', function() {
    it('should be testable', function() {
        const PORT_NAME = '/dev/ROBOT'
        MockBinding.createPort(PORT_NAME, {echo: true, record: true})
        const port = new SerialPort(PORT_NAME)

        port.on('open', function() {
            console.log('serial comms opened')
        })

        setTimeout(() => {
            port.write('hiiiiii')
        }, 2000)
        port.write('hi there')

        port.on('data', function(input) {
            console.log(input)
        })
    })
})
