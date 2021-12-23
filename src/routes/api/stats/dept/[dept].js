import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const { dept } = params;

	await sql.connect(config);

	const result = await sql.query(`
      SELECT DISTINCT TOP 20
        RUNREF, 
        RUNRTNUM Part_Num, 
        RUNNO Run, 
        RUNQTY Qty, 
        RUNPRIORITY Priority, 
        OPCENTER, 
        SOCUST, 
        CAST(ITCUSTREQ AS DATE) Cust_Date, 
        SOPO, 
        ITNUMBER, 
        ITCUSTITEMNO, 
        ISNULL((SELECT AGPMCOMMENTS FROM AgcmTable WHERE AGPART = RUNRTNUM AND AGRUN = RUNNO AND AGPO = SOPO AND AGITEM = ITNUMBER), '') Comments,
        ISNULL((SELECT DATEDIFF(MINUTE,(Select TOP 1 OPCOMPDATE From RnopTable WHERE OPREF = RUNREF AND OPRUN = RUNNO AND OPCOMPLETE IS NOT NULL ORDER BY OPCOMPDATE DESC),GETDATE())), '') Queue_Diff,
        (SELECT WCNDESC FROM WcntTable WHERE WCNNUM = OPCENTER) WC_Name
      FROM RunsTable with (nolock)
        INNER JOIN RnopTable ON RUNREF = OPREF AND RUNNO = OPRUN AND RUNOPCUR = OPNO 
        INNER JOIN RnalTable ON RUNREF = RAREF AND RUNNO = RARUN 
        INNER JOIN SoitTable ON ITSO = RASO AND ITNUMBER = RASOITEM AND RUNREF = ITPART
        INNER JOIN SohdTable ON ITSO = SONUMBER
      WHERE OPCENTER = '${dept}' AND OPCOMPLETE = 0
        AND CAST(ITCUSTREQ AS DATE) < CAST(GETDATE() + 30 AS DATE)
      ORDER BY Cust_Date ASC 
    `);

	let data = result.recordset;

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: data
	};
}
