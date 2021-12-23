import sql from 'mssql';
import { config } from '$lib/db';

export async function get() {
	try {
		await sql.connect(config);

		const result = await sql.query(`
			SELECT 
				AGPART Part_Num, 
				AGRUN Run, 
				AGPMCOMMENTS Comments, 
				OPCENTER, 
				WCNDESC WC_Name, 
				RUNQTY Qty, 
				WCNNUM,
				ISNULL((SELECT DATEDIFF(MINUTE,(Select TOP 1 OPCOMPDATE From RnopTable WHERE OPREF = RUNREF AND OPRUN = RUNNO AND OPCOMPLETE IS NOT NULL ORDER BY OPCOMPDATE DESC),GETDATE())), '') Queue_Diff

			FROM AgcmTable
				INNER JOIN RunsTable ON RUNRTNUM = AGPART and runno = AGRUN
				INNER JOIN RnopTable ON RUNREF = OPREF and RUNNO = oprun and RUNOPCUR = OPNO
				INNER JOIN WcntTable ON OPCENTER = WCNREF
				WHERE AGPMCOMMENTS LIKE '%burndown%' AND 
				((RUNSTATUS <> 'CO' AND RUNSTATUS <> 'CL' AND runstatus <> 'CA') and runstatus is not null)
			ORDER BY OPCENTER ASC	
		`);

		let data = result.recordset;

		return {
			headers: {
				'content-type': 'application/json'
			},
			body: data
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
}
