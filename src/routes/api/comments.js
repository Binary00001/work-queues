import sql from 'mssql';
import { config } from '$lib/db';

export async function post(req) {
	let { part_number, run, po_num, item, comments, expedite } = await req.body;
	sql.connect(config);

	console.log(req.body);

	let result = await sql.query(`
        INSERT INTO dbo.AgcmTable(AGPO, AGITEM, AGPART, AGRUN, AGPMCOMMENTS, AGCPEXP)
        VALUES('${po_num}', '${item}', '${part_number}', '${run}', '${comments}', '${expedite}')
    `);

	let data = result.rowsAffected;
	return {
		headers: {
			'content-type': 'application/json'
		},
		body: {
			message: req.body
		}
	};
}

export async function put(req) {
	let { part_number, run, po_num, item, comments } = await req.body;
	sql.connect(config);

	console.log(req.body);

	let result = await sql.query(`
        UPDATE dbo.AgcmTable SET AGPMCOMMENTS = '${comments}'
        WHERE AGPO = '${po_num}' AND AGITEM='${item}'
        AND AGPART = '${part_number}' AND AGRUN = '${run}'
    `);

	let data = result.rowsAffected;
	return {
		headers: {
			'content-type': 'application/json'
		},
		body: {
			message: req.body
		}
	};
}

export async function del(req) {
	let { part_number, run, po_num, item, comments, expedite } = await req.body;
	sql.connect(config);

	console.log(req.body);

	let result = await sql.query(`
        DELETE FROM dbo.AgcmTable
        WHERE AGPO = '${po_num}' AND AGITEM = '${item}' 
        AND AGPART = '${part_number}' AND AGRUN = '${run}'
    `);

	let data = result.rowsAffected;
	return {
		headers: {
			'content-type': 'application/json'
		},
		body: {
			message: req.body
		}
	};
}
