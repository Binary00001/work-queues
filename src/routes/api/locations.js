import sql from 'mssql';
import { config } from '$lib/db';

export async function get() {
	sql.connect(config);

	const result = await sql.query(
		`SELECT DISTINCT
     SUBSTRING(LOTLOCATION, 1, 1) Ref
     FROM LohdTable
     ORDER BY Ref ASC
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
