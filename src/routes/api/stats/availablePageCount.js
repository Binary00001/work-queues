import sql from 'mssql';
import { config } from '$lib/db';

export async function get() {
	await sql.connect(config);

	const result = await sql.query(
		`SELECT COUNT(LOTPARTREF) ROWS FROM LohdTable
     WHERE LOTREMAININGQTY > 0 AND LOTLOCATION NOT LIKE 'MRB'
    `
	);

	// console.log(result)

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: result.recordset
	};
}
