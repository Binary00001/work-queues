//DO NOT TOUCH. THIS WORKS FOR NOW

import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	let { po, line, part, run } = params;
	let conn;

	await sql.connect(config).then((conn = new sql.Request()));

	let result = await conn.query(`
        SELECT 
            RUNRTNUM,
            RUNNO,
            SOPO,
            ITNUMBER,
            ISNULL((SELECT AGPMCOMMENTS FROM AgcmTable WHERE AGPART = RUNRTNUM AND AGRUN = RUNNO AND AGPO = SOPO AND AGITEM = ITNUMBER), '') COMMENTS
        FROM RunsTable
            JOIN RnalTable ON RUNREF = RAREF AND RUNNO = RARUN 
            INNER JOIN SoitTable ON ITSO = RASO AND ITNUMBER = RASOITEM AND RUNREF = ITPART
            INNER JOIN SohdTable ON ITSO = SONUMBER
        WHERE SOPO = '${po}' AND ITNUMBER = '${line}' AND RUNNO = '${run}' AND RUNRTNUM = '${part}'
  
    `);

	let data = result.recordset;
	console.log(result);

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: data
	};
}
