import { ID } from 'models/common'
import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'

const useConversation = () => {
    const { listRoom, loading } = useAppSelector((state) => state.chat)
    const user = useAppSelector((state) => state.user.current)
    const dispatch = useAppDispatch()
    const messageUnseenAmount = useMemo(() => {
        if (!user) return 0
        let amount = 0
        for (const room of listRoom)
            for (const message of room.messages) {
                if (message.owner === user._id) continue
                if (!(message.seen as ID[]).includes(user._id)) amount++
            }
        return amount
    }, [listRoom])

    useEffect(() => {
        if (!user) return
        const getList = async () => {
            await dispatch(chatActions.getListRoom())
        }
        getList()
            .then(() => {})
            .catch((e) => console.log(e))
    }, [user])

    return { chatRoomList: listRoom, user, isLoading: loading, messageUnseenAmount }
}

export default useConversation
