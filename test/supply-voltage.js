require('mocha-generators').install()
const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = require('../server')

describe('The Test Jig Server', function() {
    before(function* () {
        this.api = chai.request(server)
        this.base_url = '/api/v1.0/'
    })

    // it('GET /test should return hello world', function* () {
    //     const res = yield this.api.get(`${this.base_url}test`)
    //     expect(res.body.hello_world, true)
    // })

    it('POST /supply_voltage should get a result', function* () {
        const res = yield this.api.post(`${this.base_url}/:module/voltage/get/supply`)
        expect(res.body.supply_voltage1).to.equal(10)
    })
})