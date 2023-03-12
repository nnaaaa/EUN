import { FACEBOOK_DB } from 'config/keys'
import { IComment } from 'models/comment'
import { INotification } from 'models/notification'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { notificationActions } from 'states/slices/notificationSlice'

export const useNotificationSocket = () => {
    const { socket } = useContext(SocketContext)
    const user = useAppSelector((state) => state.user.current)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!user || !socket) return

        const createOrUpdateListener = async (newData: INotification) => {
            if (newData.owner._id === user._id) return
            dispatch(notificationActions.addOrUpdate(newData))
        }

        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.notifications}/${user._id}`,
            createOrUpdateListener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.notifications}/${user._id}`,
                createOrUpdateListener
            )
        }
    }, [socket, user])
}
