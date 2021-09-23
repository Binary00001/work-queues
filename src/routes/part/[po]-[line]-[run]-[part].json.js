//DO NOT TOUCH. THIS WORKS FOR NOW

import sql from 'mssql'
import {config} from '$lib/db'

export async function get({params}) {
    let {po, line, part, run} = params
    let conn

    await sql.connect(config).then(conn = new sql.Request())


    let result = await conn.query(`
        SELECT PO as po_num, LTRIM(ITEM) as item, RTRIM([PART NUMBER]) as part_number, RUN as run, [PM COMMENTS] as comments, [CP EXP] as expedite 
        FROM dbo.AgendaViewDIQ
        WHERE PO = '${po}' AND LTRIM(ITEM) = '${line}' AND RUN = '${run}' AND [PART NUMBER] = '${part}';
    `)

    let data = result.recordset
    // console.log(result)


    return {
        headers: {
            'content-type': 'application/json'
        },
        body: data
    }

    
}