'use client'
import { useState } from "react"
import Author from "../interfaces/author"
import ButtonComponent from "./button"
import uploadBook from "../utils/uploadBook"
import Book from "../interfaces/book"

const AddBookFormComponent = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [data, setData] = useState('')
    const [extension, setExtension] = useState('')

    const readFile = async (event) => {
        const file = event.target.files.item(0)
        setExtension(file.name.split('.').pop())
        const text = await file.text();
        setData(text)
    }

    return (
        <div className='flex-col flex gap-3 p-6 border-[5px] border-black rounded-3xl bg-[#fc2947] font-[Bahnschrift] text-2xl uppercase justify-center items-center'>
            <label className='text-white'>Название файла</label>
            <input className='border-[5px] border-black outline-none bg-[#FFDEB9] rounded-[90px] p-2' type='text' value={name} onChange={(e) => { setName(e.target.value) }} />
            <label className='text-white'>Описание</label>
            <textarea className='border-[5px] border-black outline-none bg-[#FFDEB9] rounded-3xl p-2' value={description} onChange={(e) => { setDescription(e.target.value) }} />
            <label className='text-white'>Файл</label>
            <input type='file' onChange={(e) => readFile(e)} />
            <ButtonComponent text={'Загрузить'} callback={() => {
                uploadBook({
                    id: 0,
                    name: name,
                    description: description,
                    size: 0,
                    data: data,
                    extension: extension
                } as Book)
            }} />
        </div>
    )
}

export default AddBookFormComponent