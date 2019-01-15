const express = require('express'),
    app = express()

const solrCLient = require('./solr-client')

function expressStart() {
    const route = app
    route.get('/location', fetchData)
    return route
}

function fetchData(request, response) {
    const data = request.query
    const type = data.t
    const id = data.pid

    let query

    const fetchQuery = solrCLient.query().q(query).addParams({
        wt: 'json',
    }).rows(100).fl('id_prov,id_kab,id_kec,nama')

    if (type === 'provinsi') {
        query = { type: type }
    } else if (type === 'kabupaten') {
        query = { type: type, id_prov: id }
    } else if (type === 'kecamatan') {
        query = { type: type, id_kab: id }
    }

    solrCLient.search(fetchQuery, (err, res) => {
        if (err) {
            console.error('Solr error :', err)
            response.status(500).send(err)
        } else {
            response.send(res.response)
        }
    })
}

expressStart().listen(9002, () => console.log('starting express at port : 9002'))