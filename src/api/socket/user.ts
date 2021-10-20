import { FACEBOOK_DB } from 'config/keys';
import { ID } from 'models/Common';
import { IPublicInfo } from 'models/user';
import { useContext, useEffect } from 'react';
import { SocketContext } from 'states/context/socket';
import { userAPI } from './../rest/list/user';

export const useUserSocket = (
    targetId: ID | undefined,
    dispatcher: (user: Partial<IPublicInfo>) => void
) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!targetId) return
        const updateListener = async (newData: IPublicInfo) => {
            try {
                const user = await userAPI.getProfile() 
                dispatcher(user.data)
            }
            catch {
                dispatcher({})
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

export const useListUserSocket = (
    dispatcher: (user: IPublicInfo[]) => void
) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        const updateListener = async (newData: IPublicInfo) => {
            try {
                const user = await userAPI.getListUser() 
                dispatcher(user.data)
            }
            catch {
                dispatcher([])
            }
        }
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}`,
            updateListener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}`,
                updateListener
            )
        }
    }, [socket])
}

