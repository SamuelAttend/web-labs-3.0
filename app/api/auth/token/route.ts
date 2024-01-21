import getToken from '@/app/utils/getToken'
import { verify } from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function GET() {
    const token = getToken()
    if (!token) {
        return NextResponse.json({ error: 'No token found' }, { status: 401 })
    }

    try {
        verify(token, String(process.env.JWT_SECRET))
        return NextResponse.json({ message: 'User is successfully authorized via token', }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}