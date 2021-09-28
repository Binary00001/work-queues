import sql from 'mssql'
import { config } from '$lib/db'

export async function get({params}) {
    const { wc } = params

    await sql.connect(config)

    const result = await sql.query(`SELECT COUNT(OPREF) AS completed FROM dbo.RnopTable 
    WHERE OPCENTER = '${wc}'
    AND OPCOMPDATE >= CAST(GETDATE() AS DATE);`)


    let data = result.recordset

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: data
    }
}

