'use client'
import { useState } from "react"
import ProfileIconComponent from "./icons/profile"
import Link from "next/link"
import { useSearchContext } from "../contexts/searchContext"
import LinkButtonComponent from "./link_button"

const NavbarComponent = ({ children }: { children: React.ReactNode }) => {
    const [showCatalog, setShowCatalog] = useState(false)
    const { search, setSearch } = useSearchContext()

    return (
        <header className='absolute left-0 top-0 w-full'>
            <div className={`p-[20px] border-[5px] border-black inline-flex flex-col w-full items-center
            ${showCatalog ?
                    'h-[625px]  bg-[rgba(254,99,68,0.86)] rounded-b-[45px]' :
                    'h-[125px] bg-[rgba(252,41,71,0.86)] max-lg:h-[221px]'}`}>

                <div className='flex justify-center gap-6 w-[50%]'>
                    <button className={`h-[75px] rounded-full border-[5px] border-black p-4 hover:bg-[#fe6344] font-[Bahnschrift] text-3xl
                ${showCatalog ?
                            'bg-[#fc2947] text-white' :
                            'bg-[#FFDEB9] text-black'}`}
                        onClick={() => { setShowCatalog(!showCatalog) }}>КАТАЛОГ</button>

                    <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} className='w-full max-lg:w-[80%] rounded-full border-[5px] border-black p-4 bg-[#FFDEB9] font-[Bahnschrift] text-3xl outline-none max-lg:absolute max-lg:mt-24' />

                    <Link href={'/profile'} className='shrink-0 h-[75px] w-[75px] rounded-full bg-[#FFDEB9] hover:bg-[#fe6344] flex justify-center active:bg-[#fc2947] items-center border-[5px] border-black'>
                        <ProfileIconComponent />
                    </Link>
                </div>

                {showCatalog && children}
            </div>
        </header>
    )
}

export default NavbarComponent