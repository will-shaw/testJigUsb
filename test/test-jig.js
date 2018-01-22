const TestJig = require('../controllers/TestJig')
const SerialPort = require('serialport/test')
const MockBinding = SerialPort.Binding
const { expect } = require('chai')

describe('function the test jig', function() {
    this.timeout(10000)
    const PORT_NAME = '/dev/ROBOT'
    const port_options = {echo: true, record: true, productId: 1}

    it('should be testable', async function() {
        MockBinding.createPort(PORT_NAME, port_options)
        const serialPort = new SerialPort(PORT_NAME)
        const TEST_KEY = 'supply'
        const expectedResponse = `READY${TEST_KEY}\n`

        setTimeout(() => {
            serialPort.write('\n')
        }, 2000)

        const testJig = new TestJig(PORT_NAME, serialPort)

        const res = await testJig.runTest(TEST_KEY)
        expect(res).to.equal(expectedResponse)

    })

    it('should be able to list available ports', async () => {
        const expectedAmountOfPorts = 2
        MockBinding.createPort(PORT_NAME, port_options)
        MockBinding.createPort(PORT_NAME+1, port_options)
        const serialPorts = await TestJig.listPorts()
        expect(serialPorts).to.be.an('array').and.to.have.a.lengthOf(expectedAmountOfPorts)
    })

    it('should be able to find ports', async () => {
        MockBinding.createPort(PORT_NAME, port_options)
        MockBinding.createPort(PORT_NAME+1, port_options)
        const port = await TestJig.getPortFromComName(PORT_NAME)
        expect(port.comName).to.equal(PORT_NAME)
    })
})
