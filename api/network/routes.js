 
const representantelegal = require('../components/representantelegal/interface')

const routes = function(server) { 
    server.use('/representantelegal', representantelegal)
}

module.exports = routes