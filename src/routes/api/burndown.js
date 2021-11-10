import sql from 'mssql';
import { config } from '$lib/db';

export async function get() {
	try {
		await sql.connect(config);

		const result = await sql.query(`SELECT PART_NUMBER, RUN, PO, RTRIM(LTRIM(ITEM)) AS ITEM, DAYS_IN_QUEUE, CUSTOMER, PRIORITY, COMMENTS, EXPEDITE, CUST_REQ_DATE, RUN_QTY, WC, RTRIM(t2.WCNDESC) as WC_NAME
                                        FROM dbo.QueueInfo
                                        INNER JOIN WcntTable AS t2 ON WC = t2.WCNNUM
                                        WHERE SUBSTRING(COMMENTS, 1, 8) = 'BURNDOWN'
                                        ORDER BY WC ASC;`);

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
