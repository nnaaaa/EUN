import {
    faFileImage,
    faPaperPlane,
    faPlusCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import { IChatRoom } from 'models/chatRoom'
import { useRef } from 'react'
import { IconBox } from '../chatStyles'
import { useBlockingSpam } from './footerHook'
import { MessageInput } from './footerStyles'


interface IProps{
    room:IChatRoom
}

function Footer({ room }: IProps) {
    const inputMessage = useRef<null | HTMLInputElement>(null)
    const { isAllowChat, timeToAllowChat, content, setContent, sendMessage } = useBlockingSpam(room, inputMessage)
    
    

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

            <IconBox color="primary" disabled={!isAllowChat} onClick={sendMessage}>
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
