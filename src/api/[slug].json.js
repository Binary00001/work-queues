import sql from 'mssql'
import config from '$lib/dbConfig'


export async function get({params}) {
    let { slug } = params
    let data

    sql.connect({
        server: 'IMASQL01',
        authentication: {
            type: 'default',
            options: {
                userName: 'esisa',
                password: 'CNIAMI000'
            }
        },
        options: {
            database: 'Esi2000Db',
            trustServerCertificate: true
        }
    }, (err) => {
        if (err) {
            console.log(`Error connecting to database: ${err}`)
            return {
                body: { err }
            }
        }

        const request = new sql.Request();

        request.query(`SELECT TOP 10 * FROM dbo.AgcmTable`, (err, res) => {
            if (err) {
                console.log(`Error: ${err}`)
                return {
                    body: { err }
                }
            }

            return data = res.recordset

        })

    })

    console.log(slug)
    return {
        body: { data }
    }

    
    
}


