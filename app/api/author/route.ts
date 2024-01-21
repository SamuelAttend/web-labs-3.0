import dbQuery from "@/app/utils/dbQuery"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()
    const { page } = body

    const { data, err } = await dbQuery(`SELECT * FROM author LIMIT ${page * 10}, 10`, [])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'EDATANOTFOUND':
            return NextResponse.json({ error: 'Authors are not found' }, { status: 400 })
        default:
            break;
    }

    return new Response((JSON.stringify(data)),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
}