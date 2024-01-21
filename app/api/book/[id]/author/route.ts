import dbQuery from "@/app/utils/dbQuery"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const path = new URL(req.url).pathname.split('/')
    path.pop()
    const id = path.pop() || path.pop()

    const { data, err } = await dbQuery('SELECT * FROM author WHERE id IN (SELECT author_id FROM book_author WHERE book_id LIKE ?)', [id])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'EDATANOTFOUND':
            return NextResponse.json({ error: 'Book or author is not found' }, { status: 400 })
        default:
            break;
    }

    return new Response((JSON.stringify(data)),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
}