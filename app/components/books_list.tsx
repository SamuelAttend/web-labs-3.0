'use client'
import Book from "../interfaces/book"
import BookPanelComponent from "./book_panel"

const BooksListComponent = ({ books }: { books: Book[] }) => {
    return (
        <div className='h-vh w-full inline-flex flex-col gap-12 items-center'>
            {books?.map((book: Book) => {
                return (
                    <BookPanelComponent book={book} />
                )
            })}
        </div>
    )
}

export default BooksListComponent