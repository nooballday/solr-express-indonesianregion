const Solr = require('solr-node')

const solrCLient = new Solr({
    host: '127.0.0.1',
    port: '8983',
    core: 'mycore',
    protocol: 'http'
})

module.exports = solrCLient