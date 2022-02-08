import { commentAPI } from 'api/rest/list/comment'
import usePagination from 'hooks/usePagination'
import { IComment } from 'models/comment'
import { ID } from 'models/common'
import { useEffect } from 'react'
import { commentActions } from 'states/slices/commentSlice'

const useIteratorComment = (possess: { _id: ID; comments: IComment[] }) => {
    const limitPerPage = 5
    const pagination = usePagination(limitPerPage)
    const getMore = async () => {
        const { _id, comments } = possess
        const { dispatch, _limit, setIsHasMore, isHasMore } = pagination
        try {
            if (!isHasMore) return
            const oldestComment = comments[comments.length - 1]
            const res = await commentAPI.getListCommentFromTime(
                { _limit },
                _id,
                oldestComment ? oldestComment.createAt : new Date()
            )
            if (!res.data || res.data.length === 0) throw new Error()
            dispatch(
                commentActions.getMoreComments({
                    comments: res.data as any,
                    possessId: _id,
                })
            )
            //nếu mảng trả về nhỏ hơn limit thì cũng có nghĩa là đã hết data
            if (res.data.length < limitPerPage) throw new Error()
        } catch (e) {
            setIsHasMore(false)
        } finally {
        }
    }

    return { getMore, ...pagination }
}

export default useIteratorComment
