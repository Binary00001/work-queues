import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const slug = params.slug;
	sql.connect(config);

	const result = await sql.query(
		`SELECT DISTINCT LOTLOCATION 
     FROM LohdTable 
     WHERE LOTLOCATION LIKE '${slug}%'
     ORDER BY LOTLOCATION ASC
    `
	);

	console.log(result);

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: result.recordset
	};
}
