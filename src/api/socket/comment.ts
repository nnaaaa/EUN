import { friendAPI } from 'api/rest'
import { FACEBOOK_DB } from 'config/keys'
import { IComment } from 'models/comment'
import { ID } from 'models/common'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'

export const useCommentSocket = (
    postId: ID | undefined
) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!postId) return
        const listener = async (newData: IComment) => {
            // const user = await userAPI.getProfile()
            const owner = await friendAPI.findById(newData.owner as ID)
            newData.owner = owner.data as any
            dispatch(postActions.insertComment({ comment: newData, postId }))
        }
        socket.on(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/${postId}`, listener)
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/${postId}`,
                listener
            )
        }
    }, [socket, postId])
}
