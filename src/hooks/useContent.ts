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
        if (!content && !imageFiles) return

        const message: any = { content, images: imageFiles }

        //set input về giá trị trống và trỏ vào
        setContent('')
        clearImages()
        inputMessage.current?.focus()
        return message
    }
    const clearImages = () => {
        setImageFiles(undefined)
        setPreviewImages(undefined)
    }

    const inputImages = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files) return
            let listUrl: string[] = []
            for (const file of e.target.files) listUrl.push(URL.createObjectURL(file))

            setImageFiles(e.target.files)
            setPreviewImages(listUrl)
        } catch (e) {
            console.log(e)
        }
    }
    return {
        getContentAndImages,
        content,
        setContent,
        inputImages,
        previewImages,
        clearImages,
        setPreviewImages
    }
}
