import {config} from '$lib/db'
import sql from 'mssql'

export async function get({dept}) {

    // try {
    //     const dbConn = await new sql.ConnectionPool(config);

    //     await conn.connect()
    // } catch (err) {
    //     throw new Error(err)
    // }
    const conn = await new sql.ConnectionPool(config)


    conn.connect().then(() => {
        const request = new sql.Request(conn)
        request.query(`SELECT TOP 20 * FROM Esi2000Db.dbo
                       WHERE OWNERE = ?`, dept).then((res) => {
                           console.log(res)
                           return res;
                           conn.close()
                       }).catch((err) => {
                           console.log(err)
                           conn.close();
                       })
    }).catch((err) => {
        console.log(err)
    })
}