import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/Common'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'

export const useUserSocket = <T>(
    targetId: ID | undefined,
    dispatcher: (data: T) => void
) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!targetId) return
        const listener = (newData: T) => {
            dispatcher(newData)
        }
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/update/${targetId}`,
            listener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/update/${targetId}`,
                listener
            )
        }
    }, [socket,dispatcher,targetId])
}
