'use client'
import Link from "next/link"
import ButtonComponent from "./button"

const LinkButtonComponent = ({ text, path }: { text: string, path: string }) => {
    return (
        <Link href={path} className='rounded-[90px]'>
            <ButtonComponent text={text} callback={null} />
        </Link>
    )
}

export default LinkButtonComponent