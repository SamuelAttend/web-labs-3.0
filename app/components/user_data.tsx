'use client'
import User from "../interfaces/user"

const UserDataComponent = ({ user }: { user: User }) => {
    return (
        <div className='items-center flex flex-col'>
            <label className='text-white text-3xl font-[Bahnschrift] uppercase flex items-center'>
                {user.login}
            </label>
            <label className='text-white text-xl font-[Bahnschrift] uppercase flex items-center'>
                {`${user.role === 'u' ? 'Пользователь' : user.role === 'b' ? 'Заблокирован' : user.role === 'a' ? 'Администратор' : 'СуперАдминистратор'}`}
            </label>
        </div>
    )
}

export default UserDataComponent