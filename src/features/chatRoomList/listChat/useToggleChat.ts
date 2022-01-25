import { chatAPI } from 'api/rest'
import { ID } from 'models/common'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'

export const useToggleChat = () => {
    const dispatch = useAppDispatch()
    const { currentWindow, loading } = useAppSelector((state) => state.chat)
    const user = useAppSelector((state) => state.user.current)
    return async (roomId: ID) => {
        try {
            if (loading) return

            if (!user || !user._id) return

            if (currentWindow.find((room) => room._id === roomId)) {
                // dispatch(chatActions.closeWindowChat(roomId))
                return
            }
            //lấy thông thông tin về room cũng như 10 tin nhắn mới mới nhất
            await chatAPI.seenMessages(roomId)
            dispatch(chatActions.addWindowChat(roomId))
        } catch (e) {
            console.log(e)
        }
    }
}
