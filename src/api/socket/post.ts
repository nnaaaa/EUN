import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/index'
import { IPost } from 'models/post'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'

export const usePostSocket = (postId: ID) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!socket) return

        const updateListener = (newPost: IPost) => {
            newPost._id = postId
            dispatch(postActions.updatePost(newPost))
        }
        const deleteListener = () => {
            dispatch(postActions.deletePost(postId))
        }

        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/${postId}`,
            updateListener
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/delete/${postId}`,
            deleteListener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/${postId}`,
                updateListener
            )
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.posts}/delete/${postId}`,
                deleteListener
            )
        }
    }, [socket, postId])
}
