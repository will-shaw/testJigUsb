const SUPPLY_VOLTAGE = '/supply_voltage'

/**
 * Routes following .../tag_options
 * @param router the express router
 */
module.exports = function(router) {

    router.get(SUPPLY_VOLTAGE, function(req, res) {
        res.send('hello world')
    })
}