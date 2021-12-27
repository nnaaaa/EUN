import { arrayIsContain } from 'algorithms/array'
import { ID } from 'models/common'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'

export const useToggleChat = () => {
    const dispatch = useAppDispatch()
    const { current: listChat, loading } = useAppSelector((state) => state.chat)
    const user = useAppSelector((state) => state.user.current)
    return async (friendId: ID) => {
        try {
            
            if (loading) return
            
            if (!user._id) return
            
            if (
                listChat.find((room) => {
                    const listId = room.members.map((u) => u._id)
                    return arrayIsContain(listId, user._id, friendId)
                })
                ) {
                    dispatch(chatActions.closeWindowChat([user._id, friendId]))
                return
            }
            await dispatch(chatActions.addChat(friendId))
        }
        catch (e) {
            console.log(e)
        }
    }
}
