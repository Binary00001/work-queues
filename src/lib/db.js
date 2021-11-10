import sql from 'mssql';
import { partList } from './sessionStore';

export const config = {
	server: import.meta.env.VITE_DB_HOST,
	authentication: {
		type: 'default',
		options: {
			userName: import.meta.env.VITE_DB_USER,
			password: import.meta.env.VITE_DB_PASSWORD
		}
	},
	requestTimeout: 50000,
	options: {
		database: import.meta.env.VITE_DB_NAME,
		trustServerCertificate: true
	},
	pool: {
		max: 100,
		min: 0,
		idleTimeoutMillis: 10000
	}
};

export const parts = {
	async all() {
		await sql.connect(config);
		let req = new sql.Request();

		const res = await req.query(`SELECT TOP 2 RowNum as #, [PART NUMBER] as part_number, [S/D] as sd, PM, [PM COMMENTS] as cmt, [CP EXP] as expedite, [SHIP DATE] as ship_date, [CUST REQ DATE] as cust_date, [SO#] as so_num, [ITEM] as item, CUSTOMER as cust,[PO], [EXT PRICE] as ext_price, QTY, QOH, BAL, [RUN] as run, [RUN STATUS] as status, [RUN QTY] as run_qty, OWNER as owner, [CURRENT OP DATE] as opdate, [DAYS LATE] as late, [OPEN OPERATIONS] as open_ops, [DAYS IN QUEUE] as diq, SUPPLIER as supplier, [PO NUMBER] as po_num, [PO ITEM] as po_item, [DUE DATE] as due_date, table2.WCNDESC as work_center, table2.OPSUHRS as setup_hours, table2.OPCENTER as op_center, table2.RUNPRIORITY as priority 
        FROM dbo.AgendaViewDIQ WITH (nolock) 
        LEFT JOIN dbo.WC_QUEUE_ROB as table2 WITH (nolock)
        ON ([PART NUMBER] = table2.PARTNUM and RUN = table2.OPRUN)
        ORDER BY RowNum ASC;`);

		partList.set(res.recordset);
	}
};
