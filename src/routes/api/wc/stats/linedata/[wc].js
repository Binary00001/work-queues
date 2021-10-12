import sql from 'mssql'
import { config } from '$lib/db'

export async function get({params}) {
    const { wc } = params

    await sql.connect(config)

    const result = await sql.query(`
    SELECT COUNT(OPREF) AS DAILY_JOBS, CAST(OPCOMPDATE AS DATE) AS DAY FROM RnopTable
    INNER JOIN RunsTable ON RUNREF = OPREF
    AND RUNNO = OPRUN
    WHERE RUNPKPURGED = 0
    AND OPCOMPDATE >= CAST(GETDATE() AS DATETIME) - 8
    AND OPCENTER = '${wc}'
    GROUP BY CAST(OPCOMPDATE AS DATE)
    ORDER BY DAY;
    `)


    let data = result.recordset

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: data
    }
}

