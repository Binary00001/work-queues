import sql from 'mssql'

export const config = {
    server: 'IMASQL01',
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
}

sql.connect(config, (err) => {
    if (err) {
        console.log(err)
    }

    let sqlRequest = new sql.Request();

    let sqlQuery = 'SELECT TOP 20 * from Esi2000Db.dbo.AgendaViewDIQ'

    sqlRequest.query(sqlQuery, (err, data) => {
        if (err) {
            console.log(err)
        }

        console.table(data.recordset)

        sql.close();
    })
})