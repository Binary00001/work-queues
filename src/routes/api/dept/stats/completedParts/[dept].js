import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const { dept } = params;

	sql.connect(config);

	const result = await sql.query(` 
  SELECT
    ISNULL(SUM(OPACCEPT), 0) as daily_parts  
    FROM RnopTable 
    WHERE OPCENTER = '${dept}' AND OPCOMPDATE >= CAST(GETDATE() AS DATE);`);

	let data = result.recordset;

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: data
	};
}
