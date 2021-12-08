import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const { slug } = params;

	await sql.connect(config);

	//get Top 20 jobs from dept(slug)
	const result = await sql.query(`
    SELECT DISTINCT TOP 20
        RUNREF, 
        RUNRTNUM, 
        RUNNO, 
        RUNQTY, 
        RUNPRIORITY, 
        OPCENTER, 
        SOCUST, 
        CAST(ITCUSTREQ AS DATE) ITCUSTREQ, 
        SOPO, 
        ITNUMBER, 
        ITCUSTITEMNO, 
        ISNULL((SELECT AGPMCOMMENTS FROM AgcmTable WHERE AGPART = RUNRTNUM AND AGRUN = RUNNO AND AGPO = SOPO AND AGITEM = ITNUMBER), '') COMMENTS,
        ISNULL((SELECT DATEDIFF(DD,(Select TOP 1 OPCOMPDATE From RnopTable WHERE OPREF = RUNREF AND OPRUN = RUNNO AND OPCOMPLETE IS NOT NULL ORDER BY OPCOMPDATE DESC),GETDATE())), '') QUEUEDIFF,
        (SELECT WCNDESC FROM WcntTable WHERE WCNNUM = OPCENTER) WCNDESC
      FROM RunsTable
        INNER JOIN RnopTable ON RUNREF = OPREF AND RUNNO = OPRUN AND RUNOPCUR = OPNO 
        INNER JOIN RnalTable ON RUNREF = RAREF AND RUNNO = RARUN 
        INNER JOIN SoitTable ON ITSO = RASO AND ITNUMBER = RASOITEM AND RUNREF = ITPART
        INNER JOIN SohdTable ON ITSO = SONUMBER
      WHERE OPCENTER = '${slug}' AND OPCOMPLETE = 0
        AND CAST(ITCUSTREQ AS DATE) < CAST(GETDATE() + 365 AS DATE)
      ORDER BY ITCUSTREQ ASC 
         `);

	let data = result.recordset;

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: data
	};
}
