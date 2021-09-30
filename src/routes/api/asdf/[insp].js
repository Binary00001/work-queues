import sql from 'mssql'
import { config } from '$lib/db'

export async function get({params}) {
    const { insp } = params

    await sql.connect(config)

    const result = await sql.query(`
    SELECT 
     (SELECT COUNT(OPREF) FROM dbo.RnopTable 
        INNER JOIN RunsTable ON RUNREF = OPREF 
        AND RUNNO = OPRUN 
        WHERE RUNPKPURGED = 0 
        AND RTRIM(OPINSP) = '${insp}'
        AND OPCOMPDATE >= CAST(GETDATE() AS DATE)
        GROUP BY OPCENTER) AS completed_jobs 
      ;`)


    
    console.log(result)

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: result.recordset
    }
}

