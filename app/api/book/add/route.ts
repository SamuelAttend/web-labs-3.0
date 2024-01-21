import dbQuery from "@/app/utils/dbQuery"
import isAdmin from "@/app/utils/isAdmin"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()
    const { name, description, data, extension } = body

    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'User is not an admin', }, { status: 401 })
    }

    const { err } = await dbQuery('INSERT INTO book VALUES(0, ?, ?, ?, ?, ?)', [name, description, (data.length / 1_000_000), data, extension])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        default:
            break;
    }

    return NextResponse.json({ message: 'Book is successfully added', }, { status: 200 })
}