'use client'
import BooksListComponent from "@/app/components/books_list"
import FooterComponent from "@/app/components/footer"
import { usePageContext } from "@/app/contexts/pageContext"
import { useSearchContext } from "@/app/contexts/searchContext"
import Book from "@/app/interfaces/book"
import { useEffect, useState } from "react"

const AuthorPage = (context: any) => {
    const { search } = useSearchContext()
    const { page } = usePageContext()
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        const getBooks = async () => {
            const res = await fetch(`/api/author/${context.params.id}/book`, {
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
        <div className='mt-40 max-lg:mt-64 flex justify-center items-center flex-col gap-12'>
            <BooksListComponent books={books} />
            <FooterComponent />
        </div>
    )
}

export default AuthorPage