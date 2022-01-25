import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/common'
import { IPublicInfo } from 'models/user'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { userAPI } from 'api/rest/list/user'

export const useUserSocket = (
    targetId: ID | undefined,
    dispatcher: (user: IPublicInfo) => void
) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!targetId || !socket) return
        const updateListener = async (newData: IPublicInfo) => {
            try {
                const user = await userAPI.getProfile()
                dispatcher(user.data)
            } catch {
                console.log('Fail to update user role')
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

export const useListUserSocket = (dispatcher: () => void) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!socket) return
        const updateListener = async (newData: IPublicInfo) => {
            try {
                console.log(newData)
                // const user = await userAPI.getListUser()
            } catch {
            } finally {
                dispatcher()
            }
        }
        socket.on(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}`, updateListener)
        return () => {
            socket.off(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}`, updateListener)
        }
    }, [socket])
}
