import { postAPI } from 'api/rest'
import usePagination from 'hooks/usePagination'
import { useState } from 'react'
import { postActions } from 'states/slices/postSlice'

const useIteratorPost = () => {
    const limitPerPage = 3
    const pagination = usePagination(limitPerPage)
    const getMore = async () => {
        const { dispatch, _page, _limit, setPage, setIsHasMore, isHasMore } = pagination
        try {
            if (!isHasMore) return
            const res = await postAPI.getFromAllUser({ _page, _limit })
            if (!res.data || res.data.length === 0) throw new Error()
            setPage((pre) => pre + 1)
            dispatch(postActions.getMorePost(res.data as any))

            //nếu mảng trả về nhỏ hơn limit thì cũng có nghĩa là đã hết data
            if (res.data.length < limitPerPage) throw new Error()
        } catch (e) {
            setIsHasMore(false)
        }
    }

    return { getMore, ...pagination }
}

export default useIteratorPost
