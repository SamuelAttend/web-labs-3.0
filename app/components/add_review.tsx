'use client'
import Link from "next/link"
import Review from "../interfaces/review"
import { useEffect, useState } from "react"
import ButtonComponent from "./button"

const AddReviewComponent = ({ id }: { id: number }) => {
    const [text, setText] = useState('')
    const [exists, setExists] = useState(false)


    const getReview = async () => {
        const res = await fetch(`/api/profile/book/${id}/review`)
        if (res.status === 200) {
            const [result] = await res.json()
            setText(result.review)
            setExists(true)
        }
        else if (res.status === 409) {
            setExists(false)
        }
    }

    useEffect(() => {
        getReview()
    }, [])

    const addReview = async () => {
        if (exists) {
            return
        }

        fetch(`/api/profile/book/${id}/review/add`,
            {
                method: 'POST',
                body: JSON.stringify({
                    text: text
                }),
                credentials: 'include'
            }).then(res => {
                if (res.status === 200) {
                    getReview()
                }
            })
    }

    const removeReview = async () => {
        if (!exists) {
            return
        }

        fetch(`/api/profile/book/${id}/review/remove`).then(res => {
            if (res.status === 200) {
                getReview()
            }
        })
    }

    return (
        <div className='w-full inline-flex flex-col gap-3 items-center'>
            <textarea
                className='w-[50%] border-[5px] p-3 rounded-xl border-black font-[Bahnschrift] text-black outline-none bg-[#FFDEB9] text-2xl'
                value={text}
                onChange={(e) => {
                    if (!exists) {
                        setText(e.target.value)
                    }
                }}
            />
            <ButtonComponent text={`${exists ? 'Удалить отзыв' : 'Оставить отзыв'}`} callback={() => {
                if (exists) {
                    removeReview()
                }
                else {
                    addReview()
                }
            }} />
        </div>
    )
}

export default AddReviewComponent