import User from "@/app/interfaces/user"
import dbQuery from "@/app/utils/dbQuery"
import getToken from "@/app/utils/getToken"
import isAuthorized from "@/app/utils/isAuthorized"
import { decode } from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const isAuth = await isAuthorized()
    if (!isAuth) {
        return NextResponse.json({ message: 'User is not authorized', }, { status: 401 })
    }

    const token = getToken()
    const user = decode(token!) as User

    const body = await req.json()
    const { text } = body

    const path = new URL(req.url).pathname.split('/')
    path.pop()
    path.pop()
    const id = path.pop() || path.pop()

    const { err } = await dbQuery('INSERT INTO book_user_review VALUES (?, ?, ?)', [id, user.id, text])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'ER_DUP_ENTRY':
            return NextResponse.json({ error: 'Review already exists' }, { status: 409 })
        case null:
            break;
        default:
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Review is successfully added to this book', }, { status: 200 })
}