import { chatAPI } from "api/rest"
import usePagination from "hooks/usePagination"
import { ID } from "models/common"
import { chatActions } from "states/slices/chatSlice"

const useChatIterator = (roomId:ID) => {
    const pagination = usePagination(10,2)
    const getMore = async () => {
        const  {_limit,_page,setIsHasMore,setPage,dispatch,isHasMore} = pagination
        try {
            if (!isHasMore) return
            const res = await chatAPI.getMessages({ _limit, _page }, roomId)
            if (!res.data || res.data.length === 0) throw new Error()
            dispatch(chatActions.getMoreMessages({ messages: res.data as any, roomId }))
            setPage(pre => pre + 1)
        }
        catch (e) {
            setIsHasMore(false)
        }
    }
    return {getMore,...pagination}
}

export default useChatIterator