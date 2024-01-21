'use server'
import isAdmin from "../utils/isAdmin"
import CatalogAuthorsComponent from "./catalog_authors"
import LinkButtonComponent from "./link_button"

const CatalogComponent = async () => {
    const isAdm = await isAdmin()
    return (
        <div className='p-12 h-[525px] lg:justify-center w-full inline-flex gap-4 max-lg:flex-col max-lg:overflow-y-scroll max-lg:h-[379px] max-lg:mt-28'>
            <div className='inline-flex flex-col max-lg:w-full font-[Bahnschrift] text-2xl text-white text-center items-center justify-center'>
                <div>НАВИГАЦИЯ</div>
                <LinkButtonComponent text={'Главная'} path={'/'} />
            </div>
            {(isAdm) && <div className='inline-flex flex-col max-lg:w-full font-[Bahnschrift] text-2xl text-white text-center items-center justify-center'>
                <div>ПАНЕЛЬ АДМИНИСТРАТОРА</div>
                <LinkButtonComponent text={'Добавить книгу'} path={'/book/add'} />
            </div>}
            <CatalogAuthorsComponent />
        </div>
    )
}

export default CatalogComponent