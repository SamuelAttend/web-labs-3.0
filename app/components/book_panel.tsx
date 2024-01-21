'use client'
import Link from "next/link"
import DownloadButtonComponent from "./download_button"
import FavouriteButtonComponent from "./favourite_button"
import Author from "../interfaces/author"
import Book from "../interfaces/book"
import { useEffect, useState } from "react"

const BookPanelComponent = ({ book }: { book: Book }) => {
    const [authors, setAuthors] = useState<Author[]>([])

    useEffect(() => {
        const getAuthors = async () => {
            const res = await fetch(`/api/book/${book.id}/author`)
            if (res.status === 200) {
                const result = await res.json()
                setAuthors(result)
            }
        }
        getAuthors()
    }, [])

    return (
        <div className='w-fit border-[5px] border-black rounded-3xl bg-[#fc2949] inline-flex flex-col align-items p-4 text-wrap gap-4'>
            <Link href={`/book/${book.id}`} className='justify-center items-center flex border-black  rounded-xl text-3xl bg-[#fe6344] text-white p-3 underline underline-offset-8 border-[5px] text-wrap text-center'>
                {book.name}
            </Link>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className='border-[5px] border-black rounded-xl p-4 bg-[#fe6344] text-white text-2xl font-[Bahnschrift] justify-center items-center flex flex-col'>
                    {authors?.map((author: Author) => {
                        return (<Link href={`/author/${author.id}`} className='text-center underline underline-offset-8' key={author.id}>
                            {author.fullname}
                        </Link>)
                    })}
                </div>
                <div className='flex flex-row gap-4 justify-center items-center'>
                    <DownloadButtonComponent id={book.id} size={book.size.toFixed(2)} />
                    <FavouriteButtonComponent id={book.id} />
                </div>
            </div>
        </div>
    )
}

export default BookPanelComponent