const listProvinsi = require('./provinsi.json'),
    listKabupaten = require('./kabupaten.json'),
    listKecamatan = require('./kecamatan.json')
const solrCLient = require('./solr-client')

async function solrInit() {
    console.log('deleting data ..')
    await pDeleteAllData()
    console.log('inserting all data ...')
    Promise.all([...psListProvinsi(), psListKabupaten(), psListKecamatan()]).then(res => {
        console.log('Finish inserting all data')
    }).catch(err => {
        console.error(err);
    })
}

/**
 * Delete all data from core
 */
function pDeleteAllData() {
    const deletAllQuery = '*'
    return new Promise((resolve, reject) => {
        solrCLient.delete(deletAllQuery, (err, res) => {
            if (err) {
                console.error('Deleting all object err: ', err)
                reject()
                throw new Erorr(err)
            } else {
                console.log('Success deleteing all provinsi object')
                resolve()
            }
        })
    })
}

/**
 * Insert all solr object
 */
function psListProvinsi() {
    return listProvinsi.map(pronvinsi => {
        const xProvinsi = pronvinsi
        xProvinsi.type = 'provinsi'
        return new Promise((resolve, reject) => {
            return solrCLient.update(xProvinsi, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    });
}

/**
 * Insert all kabupaten
 */
function psListKabupaten() {
    return listKabupaten.map(kabupaten => {
        const xKabupaten = kabupaten
        xKabupaten.type = 'kabupaten'
        return new Promise((resolve, reject) => {
            solrCLient.update(xKabupaten, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    });
}

/**
* Insert all kecamatan
*/
function psListKecamatan() {
    return listKecamatan.map(kecamatan => {
        const xKecamatan = kecamatan
        xKecamatan.type = 'kecamatan'
        return new Promise((resolve, reject) => {
            solrCLient.update(xKecamatan, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    });
}

solrInit()