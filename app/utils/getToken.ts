'use server'
import { cookies } from "next/headers"

const getToken = () => {
    const cookieStore = cookies()
    const token = cookieStore.get('JWT')?.value as string | undefined
    return token
}

export default getToken