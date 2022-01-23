import { postAPI } from 'api/rest';
import usePagination from 'hooks/usePagination'
import { useState } from 'react';
import { postActions } from 'states/slices/postSlice';

const useIteratorPost = () => {
    const pagination = usePagination(3)
    // const [isLoading, setIsLoading] = useState(false)
    const getMore = async () => {
        const { dispatch, _page, _limit, setPage, setIsHasMore,isHasMore } = pagination
        try {
            if (!isHasMore) return
            const res = await postAPI.getFromAllUser({ _page, _limit })
            if (!res.data || res.data.length === 0) throw new Error()
            setPage(pre => pre + 1)
            dispatch(postActions.getMorePost(res.data as any))
        }
        catch (e) {
            setIsHasMore(false)
        }
    }

    return { getMore,...pagination }

}

export default useIteratorPost