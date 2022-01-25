import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/common'
import { IMessage } from 'models/message'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'

export const useMessageSocket = () => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)

    useEffect(() => {
        if (!socket || !user) return

        const addMessage = async (newMessage: IMessage) => {
            if (newMessage.owner !== user._id) {
                // const friend = room.members.find((f) => f._id === newMessage.owner)
                // if (friend) {
                //     new Audio(audio).play()
                //     createNotification(
                //         `${friend.username} send messages`,
                //         {
                //             body: newMessage.content,
                //             icon: friend.avatar,
                //         },
                //         () => { }
                //     )
                // }
            }

            dispatch(chatActions.insertMessage(newMessage))
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
        }
    }, [socket])
}
