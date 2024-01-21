'use client'
import { navigate } from "./redirectClient"

const downloadBook = (id: number) => {
    fetch(`/api/book/${id}/download`).then(
        async (res) => {
            switch (res.status) {
                case 500:
                    alert('Проблемы с подключением к серверу')
                    return
                case 401:
                    navigate('/auth')
                    return
                default:
                    break;
            }
            const data = await res.json()
            if (!Array.isArray(data)) {
                alert('Файл не найден')
                return
            }
            const [filedata] = data

            const bufferBase64 = Buffer.from(filedata.data.data, 'binary')
            const url = URL.createObjectURL(new Blob([bufferBase64], {
                type: 'text/plain'
            }))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute(
                'download',
                `${filedata.name}.${filedata.extension}`,
            )
            document.body.appendChild(link);
            link.click();
            link.parentNode!.removeChild(link);
        })
}

export default downloadBook