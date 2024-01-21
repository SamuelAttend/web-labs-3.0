'use client'
import { useEffect, useState } from 'react'
import BooksListComponent from './components/books_list'
import { useSearchContext } from './contexts/searchContext'
import './globals.css'
import Book from './interfaces/book'
import { usePageContext } from './contexts/pageContext'
import FooterComponent from './components/footer'

const AppPage = () => {
  const { search } = useSearchContext()
  const { page } = usePageContext()
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch('/api/book', {
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

export default AppPage