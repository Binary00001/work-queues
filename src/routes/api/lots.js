import sql from 'mssql';
import { config } from '$lib/db';

export async function get() {
	await sql.connect(config);

	const result = await sql.query(
		`SELECT * 
    FROM AVAIL_LOTS 
    WHERE RTRIM(LOC) != 'MRB'
    AND QOH >= QTY 
    ORDER BY SCHED ASC;`
	);

	// console.log(result)

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: result.recordset
	};
}
