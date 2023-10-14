const empresa = require('../components/empresa/interface')

const representantelegal = require('../components/representantelegal/interface')

const routes = function(server) { 
    server.use('/empresa', empresa)
    server.use('/representantelegal', representantelegal)
}

module.exports = routes