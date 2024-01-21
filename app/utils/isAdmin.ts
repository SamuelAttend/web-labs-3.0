import { decode } from 'jsonwebtoken'
import getToken from './getToken'
import isAuthorized from './isAuthorized'
import User from '../interfaces/user'

export default async () => {
    const isAuth = await isAuthorized()
    if (!isAuth) {
        return false
    }
    const token = getToken()

    const user = decode(token!) as User

    if (user.role === 'a' || user.role === 's') {
        return true
    }
    return false
}