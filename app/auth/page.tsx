import AuthFormComponent from "../components/auth_form"
import isAuthorized from "../utils/isAuthorized"
import { redirect } from 'next/navigation'

const AuthPage = async () => {
    const isAuth = await isAuthorized()
    if (isAuth) {
        redirect('/profile')
    }

    return (
        <div className=' flex pt-[250px] pb-[250px] justify-center'>
            <AuthFormComponent />
        </div>
    )
}

export default AuthPage