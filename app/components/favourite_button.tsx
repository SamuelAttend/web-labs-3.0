'use client'
import { useEffect, useState } from "react"
import ButtonComponent from "./button"

const FavouriteButtonComponent = ({ id }: { id: number }) => {
    const [favourite, setFavourite] = useState(false)

    useEffect(() => {
        fetch(`/api/profile/book/${id}`).then(
            res => res.json()
        ).then(
            res => {
                setFavourite(res.result)
            })
    }, [])

    const switchFavourite = () => {
        fetch(`/api/profile/book/${id}/switch`).then(
            res => {
                if (res.status === 200) {
                    setFavourite(!favourite)
                }
            }
        )
    }

    return (
        <ButtonComponent text={`${!favourite ? 'В избранное' : 'Убрать из избранного'} `} callback={() => { switchFavourite() }} />
    )
}

export default FavouriteButtonComponent