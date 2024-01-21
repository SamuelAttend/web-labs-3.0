'use client'
import { useEffect, useState } from "react"
import Author from "../interfaces/author"
import { usePageContext } from "../contexts/pageContext"
import LinkButtonComponent from "../components/link_button"
import FooterComponent from "../components/footer"

const AuthorsPage = () => {
    const { page } = usePageContext()
    const [authors, setAuthors] = useState<Author[]>([])

    useEffect(() => {
        const getAuthors = async () => {
            const res = await fetch('/api/author', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: page
                })
            })
            if (res.status === 200) {
                const result = await res.json()
                setAuthors(result)
            }
            else {
                setAuthors([])
            }
        }
        getAuthors()
    }, [page])

    return (
        <div className='flex-col flex items-center mt-40 max-lg:mt-64 mb-10 gap-12'>
            <div className='grid grid-cols-4 mx-auto gap-12 p-4 justify-center auto-cols-auto'>
                {authors?.map((author: Author) => {
                    return (
                        <div className='flex justify-center items-center'>
                            <LinkButtonComponent key={author.id.toString()} text={author.fullname} path={`/author/${author.id}`} />
                        </div>
                    )
                })}
            </div>
            <FooterComponent />
        </div>
    )
}

export default AuthorsPage