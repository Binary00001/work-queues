import sql from 'mssql'
import { config } from '$lib/db'

export async function get() {

    await sql.connect(config)

    const result = await sql.query(`SELECT COUNT(OPREF) as jobs_completed, OPINSP AS employee FROM dbo.RnopTable 
    INNER JOIN RunsTable ON RUNREF = OPREF AND RUNNO = OPRUN 
    WHERE RUNPKPURGED = 0 
    AND OPCOMPDATE >= CAST(GETDATE() AS DATE)
    GROUP BY OPINSP;`)


    let data = result.recordset

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: data
    }
}





