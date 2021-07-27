import sql from 'mssql'

const config = {
    user:'esisa',
    password:'CNIAMI000',
    server:'IMASQL01',
    database: 'Esi2000Db',
    options: {
        trustServerCertificate: true
    }
}

sql.connect(config, (err) => {
    if (err) {
        console.log(err)
    }

    let sqlRequest = new sql.Request();

    let sqlQuery = 'SELECT TOP 10 * from Esi2000Db.dbo.AgendaViewDIQ'

    sql.Request.query(sqlQuery, (err, data) => {
        if (err) {
            console.log(err)
        }

        console.table(data.recordset)

        sql.close();
    })
})