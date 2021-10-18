import { userAPI } from 'api/rest';
import { FACEBOOK_DB } from 'config/keys';
import { ID } from 'models/Common';
import { IPublicInfo } from 'models/user';
import { useContext, useEffect } from 'react';
import { SocketContext } from 'states/context/socket';

export const useUserSocket = (
    targetId: ID | undefined,
    dispatcher: (user: IPublicInfo) => void
) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!targetId) return
        const listener = async (newData: IPublicInfo) => {
            const user = await userAPI.getProfile() 
            dispatcher(user.data)
        }
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/update/${targetId}`,
            listener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/update/${targetId}`,
                listener
            )
        }
    }, [socket, targetId])
}

