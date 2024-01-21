import dbQuery from "@/app/utils/dbQuery"
import isAdmin from "@/app/utils/isAdmin"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()
    const { author } = body

    const path = new URL(req.url).pathname.split('/')
    path.pop()
    path.pop()
    const id = path.pop() || path.pop()

    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'User is not an admin', }, { status: 401 })
    }

    const { err } = await dbQuery('INSERT INTO book_author VALUES(?, ?)', [id, author])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'ER_DUP_ENTRY':
            return NextResponse.json({ error: 'Author is already added to this book' }, { status: 409 })
        case null:
            break;
        default:
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Author is successfully added to this book', }, { status: 200 })
}