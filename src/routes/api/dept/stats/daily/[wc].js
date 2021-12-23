import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const { wc } = params;

	sql.connect(config);

	const result = await sql.query(`
    SELECT 
	(SELECT MAX(OPTOTAL) completed_jobs
	FROM (
		SELECT OPCENTER, 
		ROW_NUMBER() OVER (PARTITION BY OPCENTER ORDER BY OPCENTER) OPTOTAL FROM RnopTable WHERE OPCOMPDATE >= CAST(GETDATE() AS DATE) AND OPCENTER = '${wc}'
	)a GROUP BY OPCENTER) completed_jobs,
	(SELECT MAX(DTOTAL) daily_goal
	FROM (
		SELECT OPCENTER,
		ROW_NUMBER() OVER (PARTITION BY OPCENTER ORDER BY OPCENTER) DTOTAL FROM RnopTable WHERE OPCOMPLETE = 0 AND OPSCHEDDATE <= CAST(GETDATE() AS DATETIME) + 30 AND OPCENTER = '${wc}'
	)b GROUP BY OPCENTER) daily_goal,
	ISNULL(SUM(OPACCEPT), 0) as daily_parts  
    FROM RnopTable 
    WHERE OPCENTER = '${wc}' AND OPCOMPDATE >= CAST(GETDATE() AS DATE);`);

	let data = result.recordset;

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: data
	};
}
