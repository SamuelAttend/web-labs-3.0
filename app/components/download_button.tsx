'use client'
import downloadBook from "../utils/downloadBook"
import ButtonComponent from "./button"

const DownloadButtonComponent = ({ id, size }: { id: number, size: string }) => {
    return (
        <ButtonComponent text={`Скачать (${size} МБ)`} callback={() => { downloadBook(id) }} />
    )
}

export default DownloadButtonComponent