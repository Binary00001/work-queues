import sql from 'mssql'
import { config } from '$lib/db'

export async function get({params}) {
    let { part } = await params

    console.log(part)

    await sql.connect(config)

    let request = new sql.Request()

    const result = await request.query(`SELECT * FROM dbo.AgendaViewDIQ WHERE [PART NUMBER] = '${part}'`)

    let data = result.recordset

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: data
    }
}