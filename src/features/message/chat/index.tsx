import { Box } from '@mui/material'
import { useChatRoomSocket } from 'api/socket/chatRoom'
import { IChatRoom } from 'models/chatRoom'
import { IMessage } from 'models/message'
import React, { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'
import Content from './content'
import Footer from './footer'
import Header from './header'
import audio from 'assets/message.mp3'
import { createNotification } from 'utils/notification'

interface IChat {}

function Chat(props: IChatRoom) {
    const [expand, setExpand] = useState(true)
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    const dispatcher = useCallback(
        (newMessage: IMessage) => {
            if (newMessage.owner !== user?._id) {
                const friend = props.members.find((f) => f._id === newMessage.owner)
                if (friend) {
                    new Audio(audio).play()
                    // const notify = new Notification(, )
                    createNotification(
                        `${friend.username} send messages`,
                        {
                            body: newMessage.content,
                            icon: friend.avatar,
                        },
                        () => {}
                    )
                }
            }

            dispatch(
                chatActions.insertMessage({ message: newMessage, roomId: props._id })
            )
        },
        [dispatch]
    )
    useChatRoomSocket(props._id, dispatcher)

    return (
        <Box bgcolor="white" boxShadow={2} mr={1} borderRadius={2} width="20rem">
            <Header room={props} setExpand={setExpand} />
            {expand && <Content room={props} />}
            {expand && <Footer room={props} />}
        </Box>
    )
}

export default React.memo(Chat)
