import { IChatRoom } from 'models/chatRoom';
import { chatAPI } from "api/rest"
import { IMessage } from "models/message"
import { ChangeEvent, FormEvent, RefObject, useEffect, useMemo, useRef, useState } from "react"

interface IBlockingSpam {
    checkerTime: number
    limitMessagePerCheckerTime: number
    blockingTime: number
}


export const useBlockingSpam = () => {
    const time = 5000
    const blockingSpam = useMemo<IBlockingSpam>(() => ({
        blockingTime: 5000,
        limitMessagePerCheckerTime: 30,
        checkerTime: 10000
    }), [])
    const [countCurSpam, setCountCurSpam] = useState<number>(0)
    const [timeToAllowChat, setTimeToAllowChat] = useState<number>(0)
    const [isAllowChat, setAllowChat] = useState<boolean>(true)
    useEffect(() => {
        setInterval(() => {
            if (countCurSpam < blockingSpam.limitMessagePerCheckerTime) setCountCurSpam(0)
            else {
                if (!isAllowChat) return
                setAllowChat(false)
                let percentTimeout = setInterval(() => {
                    setTimeToAllowChat((pre) => pre + 1)
                }, time / 100)
                setTimeout(() => {
                    clearTimeout(percentTimeout)
                    setAllowChat(true)
                    setTimeToAllowChat(0)
                    setCountCurSpam(0)
                }, time)
            }
        }, blockingSpam.checkerTime)
    }, [])
    return { isAllowChat, timeToAllowChat, setCountCurSpam: () => setCountCurSpam(pre => pre + 1), }
}

export const useSendMessage = (room: IChatRoom, inputMessage: RefObject<null | HTMLInputElement>) => {
    const [content, setContent] = useState<string>('')
    const [imageFiles, setImageFiles] = useState<FileList | undefined>()
    const [previewImages,setPreviewImages] = useState<string[] | undefined>()

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!content) return
        const message: Partial<IMessage> = { content }
        await chatAPI.sendMessage(message, room._id)

        // //set input về giá trị trống và trỏ vào
        setContent('')
        inputMessage.current?.focus()
    }
    const clearImages = () => {
        setImageFiles(undefined)
        setPreviewImages(undefined)
    }

    const inputImages = (e: any) => {
        if (!e.target.files)
            return 
        let listUrl:string[] = []
        for (const file of e.target.files)
            listUrl.push(URL.createObjectURL(file))
        setImageFiles(e.target.files)
        setPreviewImages(listUrl)
    }
    return { sendMessage, content, setContent,inputImages,previewImages,clearImages }

}

const focus = async () => {
    // await updateDocument('rooms', id, {
    //     composing: firebase.firestore.FieldValue.arrayUnion(myUid),
    // })
}
const blur = async () => {
    // await updateDocument('rooms', id, {
    //     composing: firebase.firestore.FieldValue.arrayRemove(myUid),
    // })
}