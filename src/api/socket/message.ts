import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/common'
import { IMessage } from 'models/message'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'

export const useMessageSocket = (
    targetId: ID | undefined,
    dispatcher: (user: IMessage) => void
) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!targetId || !socket) return
        const listener = async (newData: IMessage) => {
            // const user = await userAPI.getProfile()
            dispatcher(newData)
        }
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.messages}/${targetId}`,
            listener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.messages}/${targetId}`,
                listener
            )
        }
    }, [socket, targetId])
}
