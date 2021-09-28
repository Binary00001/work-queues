import sql from 'mssql'
import { config } from '$lib/db'

export async function post(req) {
    let {PART_NUMBER, RUN, PO, ITEM, COMMENTS, EXPEDITE } = await req.body
    await sql.connect(config)

    console.log(req.body)

    let result = await sql.query(`
        INSERT INTO dbo.AgcmTable(AGPO, AGITEM, AGPART, AGRUN, AGPMCOMMENTS, AGCPEXP)
        VALUES('${PO}', '${ITEM}', '${PART_NUMBER}', '${RUN}', '${COMMENTS}', '${EXPEDITE}')
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

export async function put(req) {
    let {PART_NUMBER, RUN, PO, ITEM, COMMENTS } = await req.body
    await sql.connect(config)

    console.log(req.body)

    let result = await sql.query(`
        UPDATE dbo.AgcmTable SET AGPMCOMMENTS = '${COMMENTS}'
        WHERE AGPO = '${PO}' AND AGITEM='${ITEM}'
        AND AGPART = '${PART_NUMBER}' AND AGRUN = '${RUN}'
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

export async function del(req) {
    let {PART_NUMBER, RUN, PO, ITEM, COMMENTS, EXPEDITE } = await req.body
    await sql.connect(config)

    console.log(req.body)

    let result = await sql.query(`
        DELETE FROM dbo.AgcmTable
        WHERE AGPO = '${PO}' AND AGITEM = '${ITEM}' 
        AND AGPART = '${PART_NUMBER}' AND AGRUN = '${RUN}'
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