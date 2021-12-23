import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const { dept } = params;

	await sql.connect(config);
	//rewrite to also get the part numbers of jobs
	const result = await sql.query(
		`SELECT OPINSP employee, 
             MAX(OPTOTAL) jobs_completed 
             FROM(
                SELECT OPINSP,
                ROW_NUMBER() OVER (PARTITION BY OPINSP ORDER BY OPINSP) AS OPTOTAL
                FROM RnopTable 
                    WHERE OPCOMPDATE >= CAST(GETDATE() AS DATE) 
                    AND OPCENTER='${dept}')a 
                GROUP BY OPINSP`
	);

	// console.log(result)

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: result.recordset
	};
}
