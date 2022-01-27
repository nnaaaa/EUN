import { chatAPI } from 'api/rest'
import { FACEBOOK_DB } from 'config/keys'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/common'
import { useContext, useEffect, useState } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'

export const useComposing = (room: IChatRoom) => {
    const [userComposingId, setUserComposingId] = useState<ID | null>()
    const { socket } = useContext(SocketContext)
    const user = useAppSelector((state) => state.user.current)
    useEffect(() => {
        if (!socket) return

        const setComposing = (userId: ID) => {
            setUserComposingId(userId)
        }
        const setStopComposing = () => {
            setUserComposingId(null)
        }
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/isComposing/${room._id}`,
            setComposing
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/stopComposing/${room._id}`,
            setStopComposing
        )

        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/isComposing/${room._id}`,
                setComposing
            )
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/stopComposing/${room._id}`,
                setStopComposing
            )
        }
    }, [])

    const onFocus = async () => {
        if (!socket || !user) return
        await chatAPI.seenMessages(room._id)
        socket.emit(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/isComposing`,
            room._id,
            user._id
        )
    }
    const onBlur = () => {
        if (!socket || !user) return
        socket.emit(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/stopComposing`,
            room._id,
            user._id
        )
    }
    return { onFocus, onBlur, userComposingId }
}
