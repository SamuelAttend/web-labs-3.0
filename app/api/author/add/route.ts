import dbQuery from "@/app/utils/dbQuery"
import isAdmin from "@/app/utils/isAdmin"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()
    const { fullname } = body

    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'User is not an admin', }, { status: 401 })
    }

    const { err } = await dbQuery('INSERT INTO author VALUES(0, ?)', [fullname])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        default:
            break;
    }

    return NextResponse.json({ message: 'Author is successfully added', }, { status: 200 })
}