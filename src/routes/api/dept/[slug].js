import sql from 'mssql';
import { config } from '$lib/db';

export async function get({ params }) {
	const { slug } = params;

	await sql.connect(config);

	//get Top 20 jobs from dept(slug)
	const result = await sql.query(`SELECT TOP 20 PART_NUMBER, RUN, PO, RTRIM(LTRIM(ITEM)) AS ITEM, DAYS_IN_QUEUE, CUSTOMER, PRIORITY, COMMENTS, EXPEDITE, CAST(CUST_REQ_DATE AS DATETIME) AS CUST_REQ_DATE, RUN_QTY, WORK_CENTER, WC, t2.WCNDESC as WC_NAME
      FROM dbo.QueueInfo WITH
      INNER JOIN WcntTable AS t2 ON WC = t2.WCNNUM
         WHERE WC = '${slug}'
         ORDER BY CUST_REQ_DATE ASC;`);

	let data = result.recordset;

	return {
		headers: {
			'content-type': 'application/json'
		},
		body: data
	};
}
