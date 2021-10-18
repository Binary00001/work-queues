import sql from 'mssql'
import { config } from '$lib/db'

export async function get({params}) {
    const { dept } = params

    await sql.connect(config)
    //rewrite to also get the part numbers of jobs
    const result = await sql.query(
    `SELECT COUNT(OPREF) as jobs_completed, OPINSP AS employee FROM dbo.RnopTable 
    INNER JOIN RunsTable ON RUNREF = OPREF AND RUNNO = OPRUN 
    WHERE RUNPKPURGED = 0 
    AND OPCOMPDATE >= CAST(GETDATE() AS DATE)
    AND OPCENTER = '${dept}'
    GROUP BY OPINSP;`
      )


    
    // console.log(result)

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: result.recordset
    }
}

