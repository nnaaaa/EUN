import { IChatRoom } from 'models/chatRoom';
import { chatAPI } from "api/rest"
import { IMessage } from "models/message"
import { FormEvent, RefObject, useEffect, useMemo, useRef, useState } from "react"

interface IBlockingSpam{
    checkerTime: number
    limitMessagePerCheckerTime: number
    blockingTime: number
}


export const useBlockingSpam = (room:IChatRoom,inputMessage: RefObject<null | HTMLInputElement>) => {
    const time = 5000
    const blockingSpam = useMemo<IBlockingSpam>(() => ({
        blockingTime:5000,
        limitMessagePerCheckerTime: 30,
        checkerTime:10000
    }),[])
    const countCurSpam = useRef<number>(0)

    const [timeToAllowChat, setTimeToAllowChat] = useState<number>(0)
    const [isAllowChat, setAllowChat] = useState<boolean>(true)
    const [content, setContent] = useState<string>('')
    
    useEffect(() => {
        setInterval(() => {
            if (countCurSpam.current < blockingSpam.limitMessagePerCheckerTime) countCurSpam.current = 0
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
                    countCurSpam.current = 0
                }, time)
            }
        }, blockingSpam.checkerTime)
    }, [])


    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            if (!isAllowChat) return

            countCurSpam.current++

            if (!content) return

            const message: Partial<IMessage> = {
                content
            }
            await chatAPI.sendMessage(message,room._id)
        } catch {
            countCurSpam.current = blockingSpam.limitMessagePerCheckerTime
        }

        //gửi lời nhắn
        // await updateDocument('rooms', id, {
        //     messages: firebase.firestore.FieldValue.arrayUnion({
        //         uid,
        //         content,
        //         createAt: firebase.firestore.Timestamp.now(),
        //     }),
        //     composing: firebase.firestore.FieldValue.arrayRemove(myUid),
        // })

        // //set input về giá trị trống và trỏ vào
        setContent('')
        inputMessage.current?.focus()
    }
    return { isAllowChat,timeToAllowChat,sendMessage,setContent,content }
}