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
    path.pop()
    const id = path.pop() || path.pop()

    const token = getToken()
    const user = decode(token!) as User

    const { result } = await (await (await import('../../[id]/route')).GET(new Request(`${process.env.HOST}/api/profile/favourite/${id}`))).json()

    var error
    if (!result) {
        const { err } = await dbQuery('INSERT INTO book_user_favourite VALUES(?, ?)', [id, user.id])
        error = err
    }
    else {
        const { err } = await dbQuery('DELETE FROM book_user_favourite WHERE book_id LIKE ? AND user_id LIKE ?', [id, user.id])
        error = err
    }
    switch (error) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'EDATANOTFOUND':
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
        default:
            break;
    }

    return NextResponse.json({ message: 'Favourites are altered' }, { status: 200 })
}