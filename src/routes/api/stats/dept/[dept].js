import sql from 'mssql'
import { config } from '$lib/db'

export async function get({params}) {
    const { dept } = params

    await sql.connect(config)

    const result = await sql.query(`
    SELECT 
      (SELECT COUNT(OPREF) FROM RnopTable 
        INNER JOIN RunsTable ON RUNREF = OPREF 
        AND RUNNO = OPRUN 
        WHERE RUNPKPURGED = 0 
        AND OPCENTER = '${dept}'
        AND OPCOMPDATE >= CAST(GETDATE() AS DATE)
        GROUP BY OPCENTER) AS completed_jobs, 
      (SELECT COUNT(OPREF) FROM RnopTable 
        WHERE OPCENTER = '${dept}'
        AND OPCOMPLETE = 0 
        AND OPSCHEDDATE <= CAST(GETDATE() as DATETIME) + 30
        GROUP BY OPCENTER) AS daily_goal, 
      SUM(OPACCEPT) as daily_parts
      
      FROM RnopTable 
      WHERE OPCENTER = '${dept}' AND OPCOMPDATE >= CAST(GETDATE() AS DATE);`)


    let data = result.recordset

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: data
    }
}

