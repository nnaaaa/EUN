import { unwrapResult } from '@reduxjs/toolkit'
import usePagination from 'hooks/usePagination'
import { ID } from 'models/common'
import { useEffect, useMemo } from 'react'
import { useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'

const useIteratorChatRoom = () => {
    const limitPerPage = 5
    const pagination = usePagination(limitPerPage)
    const listRoom = useAppSelector((state) => state.chat.listRoom)
    const user = useAppSelector((state) => state.user.current)
    const getMore = async () => {
        const { dispatch, setIsHasMore, isHasMore, _limit } = pagination
        try {
            if (!isHasMore) return
            const oldestRoom = listRoom[listRoom.length - 1]
            unwrapResult(
                await dispatch(
                    chatActions.getListRoomFromTime({
                        _limit,
                        fromTime: oldestRoom ? oldestRoom.newMessageAt : new Date(),
                    })
                )
            )
        } catch (e) {
            setIsHasMore(false)
        }
    }
    const messageUnseenAmount = useMemo(() => {
        if (!user) return 0
        let amount = 0
        for (const room of listRoom)
            for (const message of room.messages) {
                if (message.owner._id === user._id) continue
                if (!(message.seen as ID[]).includes(user._id)) amount++
            }
        return amount
    }, [listRoom])

    useEffect(() => {
        ;(async () => await getMore())()
    }, [])

    return { listRoom, user, messageUnseenAmount, getMore, ...pagination }
}

export default useIteratorChatRoom
