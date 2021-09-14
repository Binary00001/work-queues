
export const config = {
    server: 'IMASQL01',
    authentication: {
        type: 'default',
        options: {
            userName: 'esisa',
            password: 'CNIAMI000'
        }
    },
    requestTimeout: 50000,
    options: {
        database: 'Esi2000Db',
        trustServerCertificate: true
    },
    pool: {
        max: 50,
        min: 0,
        idleTimeoutMillis: 50000
    }
}


