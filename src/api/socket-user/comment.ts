import { FACEBOOK_DB } from 'config/keys'
import CommentStrategy from 'features/listComment/strategies'
import { IComment } from 'models/comment'
import { ID } from 'models/index'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch } from 'states/hooks'

export const useCommentSocket = (strategy: CommentStrategy) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!strategy.possess || !socket) return
        const { _id } = strategy.possess
        const createOrUpdateListener = async (newData: IComment) => {
            dispatch(strategy.getReduxActions().addOrUpdate(newData))
        }
        const deleteCommentListener = (commentId: ID) => {
            dispatch(
                strategy.getReduxActions().delete({ possessId: _id, replyId: commentId })
            )
        }

        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.comments}/${_id}`,
            createOrUpdateListener
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.comments}/deleteComment/${_id}`,
            deleteCommentListener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.comments}/${_id}`,
                createOrUpdateListener
            )
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.comments}/deleteComment/${_id}`,
                deleteCommentListener
            )
        }
    }, [socket, strategy])
}
