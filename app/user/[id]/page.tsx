'use client'
import FavouritesComponent from "@/app/components/favourites"
import UserDataComponent from "@/app/components/user_data"
import User from "@/app/interfaces/user"
import { useEffect, useState } from "react"

const UserPage = (context: any) => {
    const [user, setUser] = useState<User>({ id: context.params.id, login: 'Потерянный', role: 'u' } as User)

    useEffect(() => {
        fetch(`/api/user/${context.params.id}`).then(
            async res => {
                if (res.status === 200) {
                    const [result] = await res.json()
                    setUser(result)
                }
            }
        )
    }, [])

    return (
        <div className=' flex-col flex items-center mt-40 max-lg:mt-64 mb-10 gap-12'>
            <div className='w-[925px] h-fit p-4 flex flex-col justify-center items-center border-[5px] border-black bg-[#fc2947] rounded-3xl'>
                <div className='flex gap-24'>
                    <UserDataComponent user={user} />
                </div>
            </div>
            <FavouritesComponent id={user.id} />
        </div>
    )
}

export default UserPage