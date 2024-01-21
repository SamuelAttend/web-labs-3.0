'use client'
import Author from "../interfaces/author"
import LinkButtonComponent from "./link_button"
import { useEffect, useState } from "react"

const CatalogAuthorsComponent = () => {
    const [authors, setAuthors] = useState<Author[]>([])

    useEffect(() => {
        const getAuthors = async () => {
            const res = await fetch('/api/author', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: 0
                })
            })
            if (res.status === 200) {
                const result = await res.json()
                setAuthors(result)
            }
            else {
                setAuthors([])
            }
        }
        getAuthors()
    }, [])

    return (
        <div className='w-[585px] inline-flex flex-col max-lg:w-full font-[Bahnschrift] text-2xl text-white text-center items-center justify-center gap-2'>
            <div>АВТОРЫ</div>
            <div className='inline-flex flex-col overflow-y-scroll overflow-x-hidden gap-2'>
                {authors?.map((author: Author) => {
                    return (
                        <LinkButtonComponent text={author.fullname} key={author.id.toString()} path={`/author/${author.id}`} />
                    )
                })}
            </div>
            <div className='max-lg:hidden'>...</div>
            <LinkButtonComponent text={'Все авторы'} path={'/author'} />
        </div>
    )
}

export default CatalogAuthorsComponent