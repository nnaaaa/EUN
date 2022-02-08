import { useState } from 'react'
import { useAppDispatch } from 'states/hooks'

const usePagination = (limit: number, page: number = 1) => {
    const [_page, setPage] = useState(page)
    const [isHasMore, setIsHasMore] = useState(true)

    const dispatch = useAppDispatch()

    return { _page, _limit: limit, dispatch, setPage, isHasMore, setIsHasMore }
}

export default usePagination
