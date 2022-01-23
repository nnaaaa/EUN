import { postAPI } from 'api/rest';
import usePagination from 'hooks/usePagination'
import { ID } from 'models/common';
import { postActions } from 'states/slices/postSlice';

const useIteratorComment = (postId:ID) => {
    const pagination = usePagination(5,2)
    // const [isLoading, setIsLoading] = useState(false)
    const getMore = async () => {
        const { dispatch, _page, _limit, setPage, setIsHasMore,isHasMore } = pagination
        try {
            if (!isHasMore) return
            const res = await postAPI.getComment({ _page, _limit },postId)
            if (!res.data || res.data.length === 0) throw new Error()
            setPage(pre => pre + 1)
            dispatch(postActions.getMoreComments({ comments: res.data as any, postId }))
        }
        catch (e) {
            setIsHasMore(false)
        }
    }

    return { getMore,...pagination }

}

export default useIteratorComment