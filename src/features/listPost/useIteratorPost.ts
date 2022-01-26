import usePagination from 'hooks/usePagination'
import { postActions } from 'states/slices/postSlice'
import PostIterator from './getStrategy'

const useIteratorPost = (GetStrategy: PostIterator) => {
    const limitPerPage = 3
    const pagination = usePagination(limitPerPage)
    const getMore = async () => {
        const { dispatch, _page, _limit, setPage, setIsHasMore, isHasMore } = pagination
        try {
            const postList = await GetStrategy.getData({ _page, _limit })
            if (!isHasMore) return
            if (!postList || postList.length === 0) throw new Error()
            setPage((pre) => pre + 1)
            dispatch(postActions.getMorePost(postList as any))

            //nếu mảng trả về nhỏ hơn limit thì cũng có nghĩa là đã hết data
            if (postList.length < limitPerPage) throw new Error()
        } catch (e) {
            setIsHasMore(false)
        }
    }

    return { getMore, ...pagination, limitPerPage }
}

export default useIteratorPost
