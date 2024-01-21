'use client'
import { useEffect, useState } from "react"
import { usePageContext } from "../contexts/pageContext"
import { useSearchContext } from "../contexts/searchContext"
import Book from "../interfaces/book"
import BooksListComponent from "./books_list"
import FooterComponent from "./footer"

const FavouritesComponent = ({ id }: { id: number }) => {
    const { search } = useSearchContext()
    const { page } = usePageContext()
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        const getBooks = async () => {
            const res = await fetch(`/api/user/${id}/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: search,
                    page: page
                })
            })
            if (res.status === 200) {
                const result = await res.json()
                setBooks(result)
            }
            else {
                setBooks([])
            }
        }
        getBooks()
    }, [search, page])

    return (
        <div className='w-full flex flex-col justify-center items-center gap-12'>
            <BooksListComponent books={books} />
            <FooterComponent />
        </div>
    )
}

export default FavouritesComponent