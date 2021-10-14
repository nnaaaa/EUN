import {
    faFileImage,
    faPaperPlane,
    faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import { FormEvent, useRef, useState } from 'react'
import { IconBox } from '../chatStyles'
import { MessageInput, useStyle } from './footerStyles'

function Footer() {
    const style = useStyle()
    const time = 5000
    const checkerTime = 10000
    const numberOfMessage = 30
    const countSpam = useRef(0)

    const inputMessage = useRef<null | HTMLInputElement>(null)
    const [timeToAllowChat, setTimeToAllowChat] = useState(0)
    const [isAllowChat, setAllowChat] = useState(true)
    // useEffect(() => {
    //   setInterval(() => {
    //     if (countSpam.current < numberOfMessage) countSpam.current = 0
    //     else {
    //       if (!isAllowChat) return
    //       setAllowChat(false)
    //       let percentTimeout = setInterval(() => {
    //         setTimeToAllowChat((pre) => pre + 1)
    //       }, time / 100)
    //       setTimeout(() => {
    //         clearTimeout(percentTimeout)
    //         setAllowChat(true)
    //         setTimeToAllowChat(0)
    //         countSpam.current = 0
    //       }, time)
    //     }
    //   }, checkerTime)
    // }, [])
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isAllowChat) return

        countSpam.current++

        const content = inputMessage?.valueOf()
        if (!content) return
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
        // inputMessage.current.value = ''
        // inputMessage.current.focus()
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
        <Box p={1} display="flex" justifyContent="space-between" alignItems="center">
            <IconBox>
                <FontAwesomeIcon icon={faPlusCircle} />
            </IconBox>
            <IconBox>
                <FontAwesomeIcon icon={faFileImage} />
            </IconBox>
            <form onSubmit={sendMessage}>
                <MessageInput
                    ref={inputMessage}
                    type="text"
                    onFocus={focus}
                    onBlur={blur}
                />
            </form>

            <IconBox onClick={sendMessage} className={style.btnSend}>
                {!isAllowChat && (
                    <div className={style.progress}>
                        <CircularProgress value={timeToAllowChat} variant="determinate" />
                    </div>
                )}
                <FontAwesomeIcon icon={faPaperPlane} />
            </IconBox>
        </Box>
    )
}

export default Footer
