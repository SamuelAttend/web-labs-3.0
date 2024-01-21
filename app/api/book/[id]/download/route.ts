import dbQuery from "@/app/utils/dbQuery"
import isAuthorized from "@/app/utils/isAuthorized"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const isAuth = await isAuthorized()
    if (!isAuth) {
        return NextResponse.json({ message: 'User is not authorized', }, { status: 401 })
    }

    const path = new URL(req.url).pathname.split('/')
    path.pop()
    const id = path.pop() || path.pop()

    const { data, err } = await dbQuery('SELECT * FROM book WHERE id LIKE ?', [id])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'EDATANOTFOUND':
            return NextResponse.json({ error: 'Book is not found' }, { status: 400 })
        default:
            break;
    }

    return new Response((JSON.stringify(data)),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
}