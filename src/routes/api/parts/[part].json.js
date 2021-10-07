import sql from 'mssql'
import { config } from '$lib/db'

export async function get({params}) {
    let { part } = await params

    console.log(part)

    await sql.connect(config)

    let request = new sql.Request()

    const result = await request.query(`SELECT RTRIM(PART_NUMBER) AS PART_NUMBER, RUN, PRIORITY, COMMENTS, CUST_REQ_DATE, PO, LTRIM(ITEM) AS ITEM, CUSTOMER, PO_QTY, RUN_QTY, RTRIM(WORK_CENTER) AS WORK_CENTER, RTRIM(WC) AS WC, DAYS_IN_QUEUE 
        FROM dbo.QueueInfo WHERE RTRIM(PART_NUMBER) = '${part}'`)

    let parts = result.recordset

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: parts
    }
}