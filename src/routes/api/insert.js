import sql from 'mssql'
import { config } from '$lib/db'

export async function post({params}) {
    let {po_num, item, part_number, run, comments, exp } = params
    await sql.connect(config)

    const result = await sql.query(`
        INSERT INTO dbo.AgendaView(AGPO, AGITEM, AGPART, AGRUN, AGPMCOMMENTS, AGCPEXP)
        VALUES(${po_num}, ${item}, ${part_number}, ${run}, ${comments}, ${exp})
    `)

    let data = result.rowsAffected

    return {
        body: data
    }
}