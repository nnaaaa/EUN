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
        console.log(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/update/${targetId}`
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/update/6169621d4fef8d82ed5e5436`,
            listener
        )
        // socket.emit(`${db}/${coll}/${type}/${updateId}`)
        return () => {
            console.log('remove socket')
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/update/6169621d4fef8d82ed5e5436`,
                listener
            )
        }
    }, [socket,dispatcher,targetId])
}
