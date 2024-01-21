'use client'
import Link from "next/link"
import Review from "../interfaces/review"

const ReviewsComponent = ({ reviews }: { reviews: Review[] }) => {
    return (
        <div className='h-vh w-full inline-flex flex-col gap-12 items-center'>
            {reviews?.map((review: Review) => {
                return (
                    <div className='border-[5px] rounded-xl w-[50%] bg-[#fe6344] border-black font-[Bahnschrift] p-3 gap-3 flex flex-col text-wrap text-white text-2xl'>
                        <div className='border-[5px] w-fit p-3 rounded-xl bg-[#FFDEB9] border-black font-[Bahnschrift] text-black uppercase underline underline-offset-4'>
                            <Link href={`/user/${review.id}`}>
                                {review.login}
                            </Link>

                        </div>
                        {review.text}
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewsComponent