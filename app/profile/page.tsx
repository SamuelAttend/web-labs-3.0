import { redirect } from "next/navigation"
import isAuthorized from "../utils/isAuthorized"
import ButtonComponent from "../components/button"
import { cookies } from "next/headers"
import { decode } from "jsonwebtoken"
import getToken from "../utils/getToken"
import FavouritesComponent from "../components/favourites"
import UserDataComponent from "../components/user_data"
import User from "../interfaces/user"

const ProfilePage = async () => {
    const isAuth = await isAuthorized()
    if (!isAuth) {
        redirect('/auth')
    }

    const token = getToken()
    const user = decode(token!) as User

    return (
        <div className='mt-40 max-lg:mt-64 flex justify-center items-center flex-col gap-12'>
            <div className='w-[80%] h-fit p-4 flex flex-col justify-center items-center border-[5px] border-black bg-[#fc2947] rounded-3xl'>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <UserDataComponent user={user} />
                    <div className='text-2xl'>
                        <ButtonComponent text={"Выйти"} callback={async () => {
                            'use server'
                            const cookieStore = cookies()
                            cookieStore.delete('JWT')
                        }
                        } />
                    </div>

                </div>
            </div>
            <FavouritesComponent id={user.id} />
        </div>
    )
}

export default ProfilePage