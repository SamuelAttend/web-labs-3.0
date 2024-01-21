'use client'
import { useEffect, useState } from "react"
import ButtonComponent from "./button"
import { navigate } from '../utils/redirectClient'

const AuthFormComponent = () => {
    const [isReg, setIsReg] = useState(true)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setpasswordAgain] = useState('')
    const [error, setError] = useState('')

    const submitForm = () => {
        if (isReg) {
            if (password === passwordAgain) {
                fetch('/api/auth/register',
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            login: login,
                            password: password
                        })
                    }).then((result) => {
                        switch (result.status) {
                            case 200:
                                setError('Регистрация прошла успешно')
                                break;
                            case 400:
                                setError('Неверный запрос')
                                break;
                            case 401:
                                setError('Пользователь с таким логином уже зарегистрирован')
                                break;
                            case 500:
                                setError('Проблемы с подключением к серверу')
                                break;
                            default:
                                break;
                        }
                    })

            }
            else {
                setError('Пароли не совпадают')
            }
        }
        else {
            fetch('/api/auth/login',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: login,
                        password: password
                    })
                }).then((result) => {
                    switch (result.status) {
                        case 200:
                            navigate('/profile')
                            break;
                        case 400:
                            setError('Неверный запрос')
                            break;
                        case 401:
                            setError('Неверный логин или пароль')
                            break;
                        case 403:
                            setError('Пользователь заблокирован')
                            break;
                        case 500:
                            setError('Проблемы с подключением к серверу')
                            break;
                        default:
                            break;
                    }
                })
        }
    }

    useEffect(() => {
        setError('')
    }, [login, password, passwordAgain, isReg])

    return (
        <div className='border-black border-[5px] w-[525px] rounded-3xl h-fit bg-[#fc2947] flex justify-center items-center p-4 flex-col font-[Bahnschrift]'>
            <form className='w-full flex-col flex gap-8' onSubmit={e => {
                e.preventDefault()
            }}>
                <label className='text-white text-xl text-center'>ЛОГИН
                    <input className='w-full bg-[#FFDEB9] rounded-full border-[5px] border-black p-2 text-black outline-none'
                        value={login}
                        onChange={e => { setLogin(e.target.value) }}
                    />
                </label>

                <label className='text-white text-xl text-center'>ПАРОЛЬ
                    <input className='w-full bg-[#FFDEB9] rounded-full border-[5px] border-black p-2 text-black outline-none'
                        value={password}
                        onChange={e => { setPassword(e.target.value) }} />
                </label>

                <label className={`text-white text-xl text-center ${isReg ? 'visible' : 'invisible'}`}>ПАРОЛЬ (ПОВТОРНО)
                    <input className='w-full bg-[#FFDEB9] rounded-full border-[5px] border-black p-2 text-black outline-none'
                        value={passwordAgain}
                        onChange={e => { setpasswordAgain(e.target.value) }} />
                </label>

                <label className=' text-white text-2xl uppercase h-[125px] flex items-center justify-center text-center'>
                    {error}
                </label>

                <ButtonComponent text={`${isReg ? 'Зарегистрироваться' : 'Авторизоваться'}`} callback={submitForm} />
                <ButtonComponent text={`${isReg ? 'Форма авторизации' : 'Форма регистрации'}`} callback={() => {
                    setIsReg(!isReg)
                }} />
            </form>
        </div>
    )
}

export default AuthFormComponent