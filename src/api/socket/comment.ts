import { FACEBOOK_DB } from 'config/keys'
import { IComment } from 'models/comment'
import { ID } from 'models/common'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'

export const useCommentSocket = (
    targetId: ID | undefined,
    dispatcher: (user: IComment) => void
) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!targetId) return
        const listener = async (newData: IComment) => {
            // const user = await userAPI.getProfile()
            dispatcher(newData)
        }
        console.log(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/${targetId}`)
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/${targetId}`,
            listener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/${targetId}`,
                listener
            )
        }
    }, [socket, targetId])
}
