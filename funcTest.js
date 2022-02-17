import sql from 'mssql';

const config = {
	server: 'IMASQL01',
	database: 'Esi2000Db',
	authentication: {
		type: 'default',
		options: {
			userName: 'esisa',
			password: 'CNIAMI000'
		}
	},
	options: {
		database: 'Esi2000Db',
		trustServerCertificate: true
	}
};

function loadData() {
	const dbConn = new sql.ConnectionPool(config);

	dbConn
		.connect()
		.then(() => {
			const req = new sql.Request(dbConn);

			req.query(`SELECT TOP 10 * FROM RunsTable;`);
		})
		.then((recordset) => {
			console.table(recordset);
			dbConn.close();
		})
		.catch((err) => {
			console.log(err);
			dbConn.close();
		})
		.catch((err) => {
			console.log(err);
		});
}

loadData();

const db = {
	get: (params) => {
		let data;
		fetch(url, {
			method: 'GET',
			mode: 'cors',
			headers: { 'content-type': 'application/json' }
		})
			.then((res) => (data = res.json()))
			.catch((err) => err);
	}
};
