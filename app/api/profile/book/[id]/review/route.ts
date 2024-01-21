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

    const token = getToken()
    const user = decode(token!) as User

    const path = new URL(req.url).pathname.split('/')
    path.pop()
    const id = path.pop() || path.pop()

    const { data, err } = await dbQuery('SELECT review FROM book_user_review WHERE user_id LIKE ? AND book_id LIKE ?', [user.id, id])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'EDATANOTFOUND':
            return NextResponse.json({ error: 'Review doest not exist' }, { status: 409 })
        default:
            break;
    }

    return new Response((JSON.stringify(data)),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
}