import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const { slug } = params;

	await sql.connect(config);

	//get Top 20 jobs from dept(slug)
	const result = await sql.query(`
    SELECT DISTINCT TOP 20 
      RUNREF,
      RUNRTNUM Part_Num,
      RUNNO Run,
      ISNULL((SELECT DATEDIFF(MINUTE,(Select TOP 1 OPCOMPDATE FROM RnopTable WHERE OPREF = RUNREF AND OPRUN = RUNNO AND OPCOMPLETE IS NOT NULL ORDER BY OPCOMPDATE DESC),GETDATE())), 0) Queue_Diff,
      RUNQTY Qty,
      SOCUST Customer,
      CAST(ITCUSTREQ AS DATE)Cust_Date,
      RUNPRIORITY Priority,
      WCNDESC,
      AGPMCOMMENTS Comments,
      OPCENTER, 
      SOPO PO,
      ITNUMBER Item
 
    FROM RunsTable
      INNER JOIN RnalTable ON RUNNO=RARUN AND RUNREF=RAREF
      RIGHT OUTER JOIN PartTable ON PARTREF=RUNREF
      INNER JOIN SoitTable ON RUNREF=ITPART AND ITSO = RASO AND ITNUMBER=RASOITEM AND RASOREV=ITREV
      LEFT OUTER JOIN MrplTable ON ITSO=MRP_SONUM AND ITNUMBER=MRP_SOITEM AND ITREV=MRP_SOREV
      LEFT OUTER JOIN SohdTable ON ITSO=SONUMBER AND PALEVEL=MRP_PARTLEVEL
      LEFT JOIN RnopTable ON OPREF=RUNREF AND OPRUN=RUNNO AND OPNO=RUNOPCUR
      LEFT OUTER JOIN AgcmTable ON AGPART=RUNRTNUM AND AGRUN=RUNNO AND AGPO=SOPO AND AGITEM=ITNUMBER
      INNER JOIN WcntTable ON WCNREF=OPCENTER


    WHERE
      OPCENTER LIKE '%${slug}%' 
      AND OPCOMPDATE IS NULL AND RUNSTATUS <> 'CA' AND RUNSTATUS IS NOT NULL
    ORDER BY RUNPRIORITY, Cust_Date
         `);

	let data = result.recordset;

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: data
	};
}
