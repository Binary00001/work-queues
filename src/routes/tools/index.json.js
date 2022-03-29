import sql from 'mssql';
import { config } from '$lib/db';

export async function get(req) {
	console.log(req);

	return {
		status: 200,
		headers: {
			location: '/tools'
		}
	};
}

export async function post(req) {
	const { detail } = req.body;

	await sql.connect(config);

	const res = await sql.query(`
    SELECT DISTINCT PARTNUM 
    FROM MopkTable 
    LEFT JOIN PartTable ON PKMOPART=PARTREF
    WHERE PKPARTREF = '${detail}'
    `);

	return {
		status: 200,
		headers: {
			location: '/tools',
			'content-type': 'application/json'
		},
		body: {
			partsUsedOn: res.recordset
		}
	};
}
