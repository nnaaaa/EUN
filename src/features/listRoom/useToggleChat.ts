import { unwrapResult } from '@reduxjs/toolkit'
import { arrayIsContain } from 'algorithms/array'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/index'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'
export const useToggleChat = () => {
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((state) => state.chat)
    return async (room: IChatRoom) => {
        try {
            if (loading) return

            unwrapResult(await dispatch(chatActions.addWindowChatAsync(room)))
        } catch (e) {
            console.error(e)
        }
    }
}

export const useFindRoomByMembers = (toggleChat: ReturnType<typeof useToggleChat>) => {
    const { listRoom } = useAppSelector((state) => state.chat)
    const user = useAppSelector((state) => state.user.current)

    return async (friendId: ID) => {
        if (!user) return
        const room = listRoom.find((room) => {
            const listId = room.members.map((u) => u._id)
            return arrayIsContain(listId, user._id, friendId)
        })
        if (room) {
            await toggleChat(room)
        }
    }
}
