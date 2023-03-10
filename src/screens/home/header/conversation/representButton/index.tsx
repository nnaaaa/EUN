import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Popover, Badge } from '@mui/material'
import { useRef, useState } from 'react'
import Conversation from '..'
import { useStyle } from '../../headerStyles'
import useIteratorChatRoom from '../useChatRoomIterator'
import { useMessageSocket } from 'api/socket/message'

const ConversationButton = () => {
    const style = useStyle()
    const [toggleConverse, setToggleConverse] = useState(false)
    const conversationRef = useRef(null)

    const iteratorHook = useIteratorChatRoom()
    useMessageSocket()

    const openConverse = () => setToggleConverse(true)
    const closeConverse = () => setToggleConverse(false)

    return (
        <>
            <IconButton
                className={style.icon}
                ref={conversationRef}
                onClick={openConverse}
            >
                {iteratorHook.messageUnseenAmount ? (
                    <Badge
                        badgeContent={iteratorHook.messageUnseenAmount}
                        color="warning"
                    >
                        <FontAwesomeIcon icon={faFacebookMessenger} />
                    </Badge>
                ) : (
                    <FontAwesomeIcon icon={faFacebookMessenger} />
                )}
            </IconButton>
            <Popover
                open={toggleConverse}
                anchorEl={conversationRef.current}
                onClose={closeConverse}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Conversation iteratorHook={iteratorHook} closeConverse={closeConverse} />
            </Popover>
        </>
    )
}

export default ConversationButton
