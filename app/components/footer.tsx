'use client'

import { usePageContext } from "../contexts/pageContext"
import uploadBook from "../utils/uploadBook"
import ButtonComponent from "./button"

const FooterComponent = () => {
    const { page, setPage } = usePageContext()

    return (
        <div className='w-full h-fit flex justify-center p-3 gap-3 bg-[rgba(252,41,71,0.86)] border-[5px] border-black'>
            <ButtonComponent text={'Назад'} callback={() => {
                if (page - 1 >= 0) {
                    setPage(page - 1)
                }
            }} />
            <div className='flex text-center justify-center items-center text-3xl font-[Bahnschrift] text-white'>
                {page}
            </div>
            <ButtonComponent text={'Вперед'} callback={() => {
                setPage(page + 1)
            }} />
        </div>
    )
}

export default FooterComponent