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

export const api = import.meta.env.VITE_API_URL;
