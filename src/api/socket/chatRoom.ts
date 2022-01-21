import audio from 'assets/message.mp3'
import { FACEBOOK_DB } from 'config/keys'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/common'
import { IMessage } from 'models/message'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'
import { createNotification } from 'utils/notification'

export const useChatRoomSocket = (room: IChatRoom) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)

    useEffect(() => {
        if (!room || !socket || !user) return
        const insertMessage = async (newMessage: IMessage) => {
            if (newMessage.owner !== user._id) {
                const friend = room.members.find((f) => f._id === newMessage.owner)
                if (friend) {
                    new Audio(audio).play()
                    createNotification(
                        `${friend.username} send messages`,
                        {
                            body: newMessage.content,
                            icon: friend.avatar,
                        },
                        () => { }
                    )
                }
            }

            dispatch(
                chatActions.insertMessage({ message: newMessage, roomId: room._id })
            )
        }
        const deleteMessage = async (messageId: ID) => {
            dispatch(chatActions.removeMessage({ roomId:room._id, messageId }))
        }

        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/${room._id}`,
            insertMessage
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/deleteMessage/${room._id}`,
            deleteMessage
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/${room._id}`,
                insertMessage
            )
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/deleteMessage/${room._id}`,
                deleteMessage
            )
        }
    }, [socket, room])
}
