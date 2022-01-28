import { arrayIsContain } from 'algorithms/array'
import { chatAPI } from 'api/rest'
import { ID } from 'models/common'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'
export const useToggleChat = () => {
    const dispatch = useAppDispatch()
    const { listRoom, currentWindow, loading } = useAppSelector((state) => state.chat)
    const user = useAppSelector((state) => state.user.current)
    return async (roomId: ID) => {
        try {
            if (loading) return

            if (!user || !user._id) return

            if (currentWindow.find((room) => room._id === roomId)) {
                // dispatch(chatActions.closeWindowChat(roomId))
                return
            }
            await chatAPI.seenMessages(roomId)
            const room = listRoom.find((r) => r._id === roomId)
            if (!room) throw new Error("Room doesn't exist")
            dispatch(chatActions.addWindowChat(room))
        } catch (e) {
            console.log(e)
        }
    }
}

export const useFindRoomByMembers = (toggleChat:ReturnType<typeof useToggleChat>) => {
    const { listRoom } = useAppSelector((state) => state.chat)
    const user = useAppSelector((state) => state.user.current)

    return async (friendId: ID) => {
        if (!user) return
        const room = listRoom.find((room) => {
            const listId = room.members.map((u) => u._id)
            return arrayIsContain(listId, user._id, friendId)
        })
        if (room) {
            await toggleChat(room._id)
        }
    }
}
