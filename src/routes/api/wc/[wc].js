import sql from 'mssql'
import { config } from '$lib/db'

export async function get({params}) {
    const { wc } = params

    await sql.connect(config)

    const result = await sql.query(`SELECT COUNT(OPREF) as completed FROM dbo.RnopTable 
    INNER JOIN RunsTable ON RUNREF = OPREF AND RUNNO = OPRUN 
    WHERE RUNPKPURGED = 0 
    AND OPCENTER = '${wc}'
    AND OPCOMPDATE >= CAST(GETDATE() AS DATE)

    GROUP BY OPCENTER;`)


    let data = result.recordset

    s

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: data
    }
}

