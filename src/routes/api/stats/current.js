import sql from 'mssql'
import { config } from '$lib/db'

export async function get() {

    await sql.connect(config)

    const result = await sql.query(`
    SELECT        dbo.EmplTable.PREMNUMBER, CONCAT(RTRIM(dbo.EmplTable.PREMFSTNAME), ' ', RTRIM(dbo.EmplTable.PREMLSTNAME)) AS EMPLOYEE, dbo.PartTable.PARTNUM, dbo.IstcTable.ISRUN, dbo.IstcTable.ISOP
    FROM            dbo.EmplTable INNER JOIN
                             dbo.IstcTable ON dbo.EmplTable.PREMNUMBER = dbo.IstcTable.ISEMPLOYEE
                             INNER JOIN dbo.PartTable ON dbo.IstcTable.ISMO = dbo.PartTable.PARTREF
    WHERE        (dbo.IstcTable.ISRUN <> 0);
        `)


    let data = result.recordset

    return {
        headers: {
            'content-type': 'application/json'
        },
        body: data
    }
}


