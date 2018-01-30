const TestJig = require('../controllers/TestJig')


/**
 *
 * @api {GET} /ports List Ports
 * @apiDescription Lists the Available Ports
 * @apiGroup utils
 * @apiVersion 0.1.0
 *
 *
 * @apiSuccess {Array} ports List of Ports
 *
 *
 */
const listPorts = async (req, res) => {
    const ports = await TestJig.listPorts()
    res.send(ports)
}

module.exports = (router, config) => {

    router.route('/utils//ports')
        .get(listPorts)

}