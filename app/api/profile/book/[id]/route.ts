import User from "@/app/interfaces/user"
import dbQuery from "@/app/utils/dbQuery"
import getToken from "@/app/utils/getToken"
import isAuthorized from "@/app/utils/isAuthorized"
import { decode } from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const isAuth = await isAuthorized()
    if (!isAuth) {
        return NextResponse.json({ message: 'User is not authorized', }, { status: 401 })
    }

    const path = new URL(req.url).pathname.split('/')
    const id = path.pop() || path.pop()

    const token = getToken()
    const user = decode(token!) as User

    const { err } = await dbQuery('SELECT * FROM book_user_favourite WHERE book_id LIKE ? AND user_id LIKE ?', [id, user.id])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'EDATANOTFOUND':
            return NextResponse.json({ result: false }, { status: 200 })
        default:
            break;
    }

    return NextResponse.json({ result: true }, { status: 200 })
}