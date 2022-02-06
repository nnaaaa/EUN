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
    const { currentWindow, listRoom } = useAppSelector((state) => state.chat)
    const user = useAppSelector((state) => state.user.current)

    useEffect(() => {
        if (!socket || !user) return

        const addMessage = async (newMessage: IMessage) => {
            //nếu trong redux store chưa có phòng này thì load về
            if (!listRoom.some((r) => r._id === newMessage.chatRoom))
                await dispatch(chatActions.getNewestRoom())
            //nếu có rồi thì chèn thêm tin nhắn vào
            else dispatch(chatActions.insertMessage(newMessage))
            if (newMessage.owner._id !== user._id) {
                const room = currentWindow.find((r) => r._id === newMessage.chatRoom)
                if (!room) return
                if (user._id !== newMessage.owner._id) {
                    new Audio(audio).play()
                    createNotification(
                        `${newMessage.owner.username} send messages`,
                        {
                            body: newMessage.content,
                            icon: newMessage.owner.avatar,
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
