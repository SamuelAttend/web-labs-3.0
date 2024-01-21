import dbQuery from "@/app/utils/dbQuery"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const path = new URL(req.url).pathname.split('/')
    path.pop()
    const id = path.pop() || path.pop()

    const body = await req.json()
    const { name, page } = body

    const { data, err } = await dbQuery(`(SELECT id, name, description, size FROM book WHERE id IN (SELECT book_id FROM book_user_favourite WHERE user_id LIKE ?) AND name LIKE ?) LIMIT ${page * 10}, 10`, [id, name + '%'])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'EDATANOTFOUND':
            return NextResponse.json({ error: 'User or books are not found' }, { status: 400 })
        default:
            break;
    }

    return new Response((JSON.stringify(data)),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
}