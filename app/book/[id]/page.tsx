'use client'
import AddReviewComponent from "@/app/components/add_review"
import BookPanelComponent from "@/app/components/book_panel"
import ReviewsComponent from "@/app/components/reviews"
import Book from "@/app/interfaces/book"
import Review from "@/app/interfaces/review"
import { useEffect, useState } from "react"

const BookPage = (context: any) => {
    const [book, setBook] = useState<Book>({
        id: context.params.id,
        name: 'Таинственная книга',
        size: 666
    } as Book)

    const [reviews, setReviews] = useState<Review[]>([])

    useEffect(() => {
        const getBook = async () => {
            const res = await fetch(`/api/book/${context.params.id}`)
            if (res.status === 200) {
                const [result] = await res.json()
                setBook(result)
            }
        }
        getBook()
    }, [])

    useEffect(() => {
        const getReviews = async () => {
            const res = await fetch(`/api/book/${book.id}/review`)
            if (res.status === 200) {
                const result = await res.json()
                console.log(result)
                setReviews(result)
            }
        }
        getReviews()
    }, [])

    return (
        <div className='mt-40 max-lg:mt-64 mb-10 flex items-center justify-center flex-col gap-12'>
            <BookPanelComponent book={book} />
            <AddReviewComponent id={book.id} />
            <ReviewsComponent reviews={reviews} />
        </div>
    )
}

export default BookPage