import { chatAPI } from 'api/rest'
import usePagination from 'hooks/usePagination'
import { IChatRoom } from 'models/chatRoom'
import { useEffect } from 'react'
import { chatActions } from 'states/slices/chatSlice'

const useChatIterator = (room: IChatRoom) => {
    const limitPerPage = 10
    const pagination = usePagination(limitPerPage)
    const getMore = async () => {
        const { _limit, setIsHasMore, dispatch, isHasMore } = pagination
        try {
            if (!isHasMore) return
            //lấy tin nhắn từ khoảng thời giản của tin nhắn cũ nhất của room
            const oldestMessage = room.messages[room.messages.length - 1]
            const res = await chatAPI.getMessagesFromTime(
                { _limit },
                room._id,
                oldestMessage ? oldestMessage.createAt : new Date()
            )
            if (!res.data || res.data.length === 0) throw new Error()
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
        (async () => await getMore())()
    }, [])

    return { getMore, ...pagination }
}

export default useChatIterator
