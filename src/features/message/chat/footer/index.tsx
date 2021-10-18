import {
    faFileImage,
    faPaperPlane,
    faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import { chatAPI } from 'api/rest'
import { IChatRoom } from 'models/chatRoom'
import { IMessage } from 'models/message'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { IconBox } from '../chatStyles'
import { MessageInput } from './footerStyles'

interface IBlockingSpam{
    checkerTime: number
    limitMessagePerCheckerTime: number
    blockingTime: number
}

interface IProps{
    room:IChatRoom
}

function Footer({room}:IProps) {
    const time = 5000
    const blockingSpam = useMemo<IBlockingSpam>(() => ({
        blockingTime:5000,
        limitMessagePerCheckerTime: 30,
        checkerTime:10000
    }),[])
    const countCurSpam = useRef<number>(0)

    const inputMessage = useRef<null | HTMLInputElement>(null)
    const [timeToAllowChat, setTimeToAllowChat] = useState<number>(0)
    const [isAllowChat, setAllowChat] = useState<boolean>(true)
    const [content,setContent] = useState<string>('')
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
    return (
        <Box
            p={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <IconBox>
                <FontAwesomeIcon icon={faPlusCircle} />
            </IconBox>
            <IconBox>
                <FontAwesomeIcon icon={faFileImage} />
            </IconBox>
            <form onSubmit={sendMessage}>
                <MessageInput
                    ref={inputMessage}
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    type="text"
                    onFocus={focus}
                    onBlur={blur}
                />
            </form>

            <IconBox color="primary" disabled={!isAllowChat}>
                {isAllowChat ? (
                    <FontAwesomeIcon icon={faPaperPlane} />
                ) : (
                    <CircularProgress
                        value={timeToAllowChat}
                        variant="determinate"
                        size={20}
                    />
                )}
            </IconBox>
        </Box>
    )
}

export default Footer
