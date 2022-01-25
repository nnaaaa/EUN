import { chatAPI } from 'api/rest'
import usePagination from 'hooks/usePagination'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/common'
import { useEffect } from 'react'
import { chatActions } from 'states/slices/chatSlice'

const useChatIterator = (room: IChatRoom) => {
    const limitPerPage = 10
    const pagination = usePagination(limitPerPage)
    const getMore = async () => {
        const { _limit, _page, setIsHasMore, setPage, dispatch, isHasMore } = pagination
        try {
            if (!isHasMore) return
            const res = await chatAPI.getMessages(
                { _limit, _page },
                room._id,
                room.newMessageAt
            )
            if (!res.data || res.data.length === 0) throw new Error()
            setPage((pre) => pre + 1)
            dispatch(
                chatActions.getMoreMessages({
                    messages: res.data as any,
                    roomId: room._id,
                })
            )

            //nếu mảng trả về nhỏ hơn limit thì cũng có nghĩa là đã hết data
            if (res.data.length < limitPerPage) throw new Error()
        } catch (e) {
            setIsHasMore(false)
        }
    }
    useEffect(() => {
        const getTheFirstTime = async () => {
            const { setIsHasMore, setPage, dispatch } = pagination
            try {
                const res = await chatAPI.getNewestMessageOfRoom(room._id)
                if (!res.data || res.data.length === 0) throw new Error()
                setPage((pre) => pre + 1)
                dispatch(
                    chatActions.getMessagesTheFirstTime({
                        messages: res.data as any,
                        roomId: room._id,
                    })
                )
                //nếu mảng trả về nhỏ hơn limit thì cũng có nghĩa là đã hết data
                if (res.data.length < limitPerPage) throw new Error()
            } catch (e) {
                setIsHasMore(false)
            }
        }
        getTheFirstTime()
            .then(() => {})
            .catch((e) => console.log(e))
    }, [])

    return { getMore, ...pagination }
}

export default useChatIterator
