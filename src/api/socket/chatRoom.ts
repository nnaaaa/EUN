import { FACEBOOK_DB } from 'config/keys';
import { ID } from 'models/Common';
import { IMessage } from 'models/message';
import { useContext, useEffect } from 'react';
import { SocketContext } from 'states/context/socket';

export const useChatRoomSocket = (
    targetId: ID | undefined,
    dispatcher: (message: IMessage) => void
) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!targetId) return
        const listener = async (newMessage: IMessage) => {
            // const user = await userAPI.getProfile() 
            // console.log(newMessage)
            dispatcher(newMessage)
        }
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/${targetId}`,
            listener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/${targetId}`,
                listener
            )
        }
    }, [socket, targetId])
}


