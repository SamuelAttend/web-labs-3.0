'use client'
import AddBookFormComponent from "@/app/components/add_book_form"

const AddBookPage = () => {
    return (
        <div className='mt-40 max-lg:mt-64 flex justify-center items-center flex-col gap-12'>
            <AddBookFormComponent />
        </div>
    )
}

export default AddBookPage