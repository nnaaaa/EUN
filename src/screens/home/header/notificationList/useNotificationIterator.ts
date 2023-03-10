import { unwrapResult } from '@reduxjs/toolkit'
import usePagination from 'hooks/usePagination'
import { ID } from 'models/index'
import { useEffect, useMemo } from 'react'
import { useAppSelector } from 'states/hooks'
import { notificationActions } from 'states/slices/notificationSlice'
const useNotificationIterator = () => {
    const limitPerPage = 10
    const pagination = usePagination(limitPerPage)
    const listNotification = useAppSelector((state) => state.notification.current)

    const user = useAppSelector((state) => state.user.current)
    const getMore = async () => {
        const { dispatch, setIsHasMore, isHasMore, _limit } = pagination
        try {
            if (!isHasMore) return
            const oldestNotification = listNotification[listNotification.length - 1]
            unwrapResult(
                await dispatch(
                    notificationActions.getListFromTime({
                        _limit,
                        fromTime: oldestNotification
                            ? oldestNotification.createAt
                            : new Date(),
                    })
                )
            )
        } catch (e) {
            setIsHasMore(false)
        }
    }
    const noticeUnseenAmount = useMemo(() => {
        if (!user) return 0
        let amount = 0
        for (const notice of listNotification) {
            if (notice.owner._id === user._id) continue
            if (!(notice.seen as ID[]).includes(user._id)) amount++
        }
        return amount
    }, [listNotification])

    useEffect(() => {
        ;(async () => await getMore())()
    }, [])

    return { user, noticeUnseenAmount, getMore, ...pagination }
}

export default useNotificationIterator
