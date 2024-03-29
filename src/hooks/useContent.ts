import { IChatRoom } from 'models/chatRoom'
import { IMessage } from 'models/message'
import { ChangeEvent, RefObject, useState } from 'react'

interface DefaultReturnType {
    content: string
    images: FileList | undefined
}

export const useContent = <T = DefaultReturnType>(
    inputMessage: RefObject<null | HTMLInputElement>
) => {
    const [content, setContent] = useState<string | undefined>('')
    const [imageFiles, setImageFiles] = useState<FileList | undefined>()
    const [previewImages, setPreviewImages] = useState<string[] | undefined>()

    const getContentAndImages = () => {
        if (!content && !previewImages) return

        const message: any = { content, images: imageFiles }

        //set input về giá trị trống và trỏ vào
        clearAll()
        inputMessage.current?.focus()
        return message
    }
    const clearImages = () => {
        setImageFiles(undefined)
        setPreviewImages(undefined)
    }
    const clearAll = () => {
        clearImages()
        setContent('')
    }

    const inputImages = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files) return

            let listUrl: string[] = []
            for (const file of e.target.files) listUrl.push(URL.createObjectURL(file))
            setImageFiles(e.target.files)
            setPreviewImages(listUrl)
        } catch (e) {
            console.error(e)
        }
    }
    return {
        getContentAndImages,
        content,
        setContent,
        inputImages,
        previewImages,
        clearImages,
        setPreviewImages,
        imageFiles,
        clearAll,
    }
}
