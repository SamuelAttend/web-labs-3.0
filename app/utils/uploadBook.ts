'use client'

import Book from "../interfaces/book";

const uploadBook = (book: Book) => {
    fetch('/api/book/add', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(book)
    }).then(res => console.log(res))
}

export default uploadBook