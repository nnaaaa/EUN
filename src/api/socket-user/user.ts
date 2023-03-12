import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/index'
import { IPublicInfo } from 'models/user'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { userAPI } from 'api/restful-user/list/user'
import { useAppDispatch } from 'states/hooks'
import { userActions } from 'states/slices/userSlice'

export const useUserSocket = (
    targetId: ID | undefined,
    dispatcher: (user: IPublicInfo) => Promise<void>
) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!targetId || !socket) return
        const updateListener = async (newData: IPublicInfo) => {
            try {
                await dispatcher(newData)
            } catch {
                console.error('Fail to update user role')
            }
        }

        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/${targetId}`,
            updateListener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/${targetId}`,
                updateListener
            )
        }
    }, [socket, targetId])
}

export const useListUserSocket = () => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!socket) return
        const updateListener = async (newData: IPublicInfo) => {
            try {
                dispatch(userActions.updateFriend(newData))
            } catch {
            } finally {
            }
        }
        socket.on(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}`, updateListener)
        return () => {
            socket.off(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}`, updateListener)
        }
    }, [socket])
}
