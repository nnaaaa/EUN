import { friendAPI } from 'api/rest'
import { FACEBOOK_DB } from 'config/keys'
import { IComment } from 'models/comment'
import { ID } from 'models/common'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'

export const useCommentSocket = (postId: ID | undefined) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!postId || !socket) return
        const createOrUpdateListener = async (newData: IComment) => {
            const owner = await friendAPI.findById(newData.owner as ID)
            newData.owner = owner.data as any
            dispatch(postActions.createOrUpdateComment({ comment: newData, postId }))
        }
        const deleteCommentListener = (commentId: ID) => {
            dispatch(postActions.deleteComment({ postId, commentId }))
        }

        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/${postId}`,
            createOrUpdateListener
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/deleteComment/${postId}`,
            deleteCommentListener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/${postId}`,
                createOrUpdateListener
            )
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/deleteComment/${postId}`,
                deleteCommentListener
            )
        }
    }, [socket, postId])
}
