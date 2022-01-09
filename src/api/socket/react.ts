import { postActions } from 'states/slices/postSlice'
import { useAppDispatch } from 'states/hooks'
import { postAPI } from 'api/rest'
import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/common'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { IReact } from 'models/react'

export const useReactSocket = (postId: ID | undefined, reactId: ID | undefined) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!postId || !reactId || !socket) return
        const listener = async (newReact: IReact) => {
            const react = await postAPI.getReact(reactId)
            if (!react) return
            dispatch(postActions.updateReact({ react: react.data, postId }))
        }
        socket.on(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/${reactId}`, listener)
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/${reactId}`,
                listener
            )
        }
    }, [socket, postId, reactId])
}
