import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt'
import dbQuery from "@/app/utils/dbQuery";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import User from "@/app/interfaces/user";

const EXPIRES_IN = 60 * 60

export async function POST(req: Request) {
    const body = await req.json()
    const { login, password } = body

    if (!login || !password) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { data, err } = await dbQuery('SELECT * FROM user WHERE login LIKE ?', [login])
    switch (err) {
        case 'ECONNREFUSED':
            return NextResponse.json({ error: 'Connection issues' }, { status: 500 })
        case 'EDATANOTFOUND':
            return NextResponse.json({ error: 'Invalid authorization data' }, { status: 401 })
        default:
            break;
    }

    const [user] = data as User[]

    const result = await bcrypt.compare(password, user.password)
    if (!result) {
        return NextResponse.json({ error: 'Invalid authorization data' }, { status: 401 })
    }

    if (user.role === 'b') {
        return NextResponse.json({ message: 'User is blocked' }, { status: 403 })
    }

    const secret = process.env.JWT_SECRET || ""

    const token = sign({
        id: user.id,
        login: user.login,
        role: user.role
    }, secret, { expiresIn: EXPIRES_IN })
    const serialized = serialize('JWT', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: EXPIRES_IN,
        path: '/'
    })

    return new Response(JSON.stringify({ message: 'User is successfully authorized' }),
        {
            status: 200,
            headers: { 'Set-Cookie': serialized }
        })
}