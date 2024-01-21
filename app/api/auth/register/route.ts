import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt'
import dbQuery from "@/app/utils/dbQuery";

export async function POST(req: Request) {
    const body = await req.json()
    const { login, password } = body

    if (!login || !password) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
    const { err } = await dbQuery('INSERT INTO user VALUES(0, ?, "u", ?)', [login.toLowerCase(), hash])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'ER_DUP_ENTRY':
            return NextResponse.json({ error: 'User already exists' }, { status: 401 })
        default:
            break;
    }

    return NextResponse.json({ message: 'User is successfully registered', }, { status: 200 })
}