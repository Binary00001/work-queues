import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const { dept } = params;

	sql.connect(config);

	const result = await sql.query(`
    SELECT 
      (SELECT MAX(DTOTAL) daily_goal
	FROM (
		SELECT OPCENTER,
		ROW_NUMBER() OVER (PARTITION BY OPCENTER ORDER BY OPCENTER) DTOTAL FROM RnopTable WHERE OPCOMPLETE = 0 AND OPSCHEDDATE <= CAST(GETDATE() AS DATETIME) + 30 AND OPCENTER = '${dept}'
	)b GROUP BY OPCENTER) daily_goal`);

	let data = result.recordset;

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: data
	};
}
