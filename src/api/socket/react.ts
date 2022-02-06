import { postActions } from 'states/slices/postSlice'
import { useAppDispatch } from 'states/hooks'
import { postAPI } from 'api/rest'
import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/common'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { IReact } from 'models/react'

export const useReactSocket = (postId: ID | undefined) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!postId || !socket) return
        const addOrUpdateListener = async (newData: IReact) => {
            dispatch(postActions.addOrUpdateReact({ react: newData, postId }))
        }
        const removeListener = (reactId: ID) => {
            dispatch(postActions.removeReact({ postId, reactId }))
        }

        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/${postId}`,
            addOrUpdateListener
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/deleteReact/${postId}`,
            removeListener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/${postId}`,
                addOrUpdateListener
            )
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/deleteReact/${postId}`,
                removeListener
            )
        }
    }, [socket, postId])
}
