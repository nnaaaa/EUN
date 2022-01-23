import { chatAPI } from "api/rest"
import usePagination from "hooks/usePagination"
import { ID } from "models/common"
import { chatActions } from "states/slices/chatSlice"

const useChatIterator = (roomId:ID) => {
    const limitPerPage = 10
    const pagination = usePagination(limitPerPage,2)
    const getMore = async () => {
        const  {_limit,_page,setIsHasMore,setPage,dispatch,isHasMore} = pagination
        try {
            if (!isHasMore) return
            const res = await chatAPI.getMessages({ _limit, _page }, roomId)
            if (!res.data || res.data.length === 0) throw new Error()
            setPage(pre => pre + 1)
            dispatch(chatActions.getMoreMessages({ messages: res.data as any, roomId }))

            //nếu mảng trả về nhỏ hơn limit thì cũng có nghĩa là đã hết data
            if (res.data.length < limitPerPage) throw new Error()
        }
        catch (e) {
            setIsHasMore(false)
        }
    }
    return {getMore,...pagination}
}

export default useChatIterator