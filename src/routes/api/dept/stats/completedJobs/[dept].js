import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const { dept } = params;

	sql.connect(config);

	const result = await sql.query(`
    SELECT 
      (SELECT MAX(OPTOTAL)
	      FROM (
		      SELECT 
            OPCENTER, 
		        ROW_NUMBER() OVER (PARTITION BY OPCENTER ORDER BY OPCENTER) OPTOTAL 
          FROM RnopTable 
          WHERE OPCOMPDATE >= CAST(GETDATE() AS DATE) AND OPCENTER = '${dept}'
	      )a 
      GROUP BY OPCENTER) completed_jobs`);

	let data = result.recordset;

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: data
	};
}
