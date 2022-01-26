import audio from 'assets/message.mp3'
import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/common'
import { IMessage } from 'models/message'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'
import { createNotification } from 'utils/notification'

export const useMessageSocket = () => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    const currentWindow = useAppSelector((state) => state.chat.currentWindow)
    const user = useAppSelector((state) => state.user.current)

    useEffect(() => {
        if (!socket || !user) return

        const addMessage = async (newMessage: IMessage) => {
            dispatch(chatActions.insertMessage(newMessage))
            if (newMessage.owner !== user._id) {
                const room = currentWindow.find((r) => r._id === newMessage.chatRoom)
                if (!room) return
                const friend = room.members.find((f) => f._id === newMessage.owner)
                if (friend) {
                    new Audio(audio).play()
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
        }
        const updateMessage = async (updateMessage: IMessage) => {
            dispatch(chatActions.updateMessage(updateMessage))
        }
        const deleteMessage = async (roomId: ID, messageId: ID) => {
            dispatch(chatActions.removeMessage({ roomId, messageId }))
        }

        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/addMessage/${user._id}`,
            addMessage
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/updateMessage/${user._id}`,
            updateMessage
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/deleteMessage/${user._id}`,
            deleteMessage
        )

        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/addMessage/${user._id}`,
                addMessage
            )
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/updateMessage/${user._id}`,
                updateMessage
            )
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/deleteMessage/${user._id}`,
                deleteMessage
            )
        }
    }, [socket, currentWindow])
}
