import sql from 'mssql'
import { config } from '$lib/db'

export async function del(req) {
    let {part_number, run, po_num, item, comments, exp } = await req.body
    await sql.connect(config)

    console.log(req.body)

    let result = await sql.query(`
        DELETE FROM dbo.AgcmTable
        WHERE AGPO = '${po_num}' AND AGITEM = '${item}' 
        AND AGPART = '${part_number}' AND AGRUN = '${run}'
    `)

    let data = result.rowsAffected
    return {
        headers: {
            'content-type': 'application/json'
        },
        body: {
            message: req.body
        }
    }
}
