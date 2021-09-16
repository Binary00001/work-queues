//THIS WORKS!!!! FINALLY
// add try catch

import sql from 'mssql'
import { config } from '$lib/db'

export async function get({params}) {
    const { slug } = params

    await sql.connect(config)

    const result = await sql.query(`SELECT TOP 20 [PART NUMBER] as part_number, RUN as run, [RUN QTY] as qty, CUSTOMER as cust, [CUST REQ DATE] as ship_date, [PM COMMENTS] as comments, table2.WCNDESC as work_center, table2.OPSUHRS as setup_hours, table2.OPRUNHRS as run_hours, table2.OPCENTER as op_center, table2.RUNPRIORITY as priority 
         FROM Esi2000Db.dbo.AgendaViewDIQ WITH (nolock)
         LEFT JOIN dbo.WC_QUEUE_ROB as table2 WITH (nolock)
         ON ([PART NUMBER] = table2.PARTNUM and RUN = table2.OPRUN)
         WHERE OWNER = '${slug}'
         ORDER BY RowNum ASC;`)


    let data = result.recordset

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: data
    }
}

