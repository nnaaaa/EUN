import { useUserSocket } from 'api/socket/user'
import { IPublicInfo } from 'models/user'
import { RefObject, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { searchActions } from './searchSlice'

export const useFindUser = (searchInput: RefObject<HTMLInputElement>) => {
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const dispatch = useAppDispatch()
    return useCallback(async () => {
        if (!searchInput.current) return

        if (!searchInput.current?.value) return

        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(async () => {
            if (!searchInput.current?.value) return
            const searchTarget = (searchInput.current?.value.trim() as string) || ''
            await dispatch(searchActions.getResult(searchTarget))
        }, 300)
    }, [searchInput])
}

export const useSearchSocket = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)

    const updateRole = useCallback(
        (newInfo: IPublicInfo) => {
            dispatch(searchActions.updateStore(newInfo))
        },
        [dispatch]
    )

    useUserSocket(user ? user._id : undefined, updateRole)
}
