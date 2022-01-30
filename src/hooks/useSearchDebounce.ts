import { unwrapResult } from '@reduxjs/toolkit'
import usePagination from 'hooks/usePagination'
import { RefObject, useCallback, useRef, useState } from 'react'
import { searchActions } from '../states/slices/searchSlice'

export const useFindUserDebounce = (searchInput: RefObject<HTMLInputElement>, role: 'friend' | 'all') => {
    const limitPerPage = 10
    const pagination = usePagination(limitPerPage)
    const [preSearch,setPreSearch] = useState('')
    const getMore = async () => {
        const { setIsHasMore, isHasMore, setPage,_limit,_page } = pagination
        try {
            if (!searchInput.current?.value) return
            const searchTarget = (searchInput.current?.value.trim() as string) || ''
            if (!isHasMore) return
            if (role === 'friend')
                unwrapResult(await pagination.dispatch(searchActions.findFriendByName({ searchTarget,query:{_limit,_page} })))
            else if (role === 'all')
                unwrapResult(await pagination.dispatch(searchActions.findAllUserByName({ searchTarget,query:{_limit,_page} })))
            setPage(pre => pre + 1)
        } catch (e) {
            setIsHasMore(false)
        }
    }
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const getTheFirstTime = useCallback(async () => {
        const { setIsHasMore, setPage, _limit } = pagination
        if (!searchInput.current) return
        if (!searchInput.current?.value) return

        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(async () => {
            try {
                if (!searchInput.current) return
                if (!searchInput.current?.value) return
                const searchTarget = (searchInput.current?.value.trim() as string)
                if (preSearch === searchTarget)
                    return
                setIsHasMore(true)
                if (role === 'friend')
                    unwrapResult(await pagination.dispatch(searchActions.findFriendByName({ searchTarget,query:{_limit,_page:1} })))
                else if (role === 'all')
                    unwrapResult(await pagination.dispatch(searchActions.findAllUserByName({ searchTarget,query:{_limit,_page:1} })))
                setPreSearch(searchTarget)
                setPage(2)

            }
            catch (e) {
                setIsHasMore(false)
            }
        }, 300)
    }, [searchInput, pagination])

    return { getMore, getTheFirstTime, ...pagination }
}



// export const useSearchSocket = () => {
//     const dispatch = useAppDispatch()
//     const user = useAppSelector((state) => state.user.current)

//     const updateRole = useCallback(
//         (newInfo: IPublicInfo) => {
//             dispatch(searchActions.updateStore(newInfo))
//         },
//         [dispatch]
//     )

//     useUserSocket(user ? user._id : undefined, updateRole)
// }
