import mysql from "mysql2/promise"

export default async (query: string, values: any) => {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            database: 'myapp',
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            dateStrings: true
        })

        const [data] = await connection.execute(query, values)
        connection.end()

        if (Array.isArray(data) && data.length === 0) {
            throw {
                code: 'EDATANOTFOUND'
            }
        }

        return { data: data, err: null }
    }
    catch (err: any) {
        return { data: [null], err: err.code }
    }


}
