import { reactAPI } from 'api/rest/list/react'
import {
    displayPostReact,
    IDisplayCriterionReactType,
} from 'features/listReact/postCriterion'
import { FACEBOOK_DB } from 'config/keys'
import { IEmoji, IReact } from 'models/react'
import { IPublicInfo } from 'models/user'
import { useContext, useMemo, useState } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import ReactStrategy from '../features/listReact/strategies'
import CommentStrategy from 'features/listComment/strategies'
import { commentActions } from 'states/slices/commentSlice'
import useIteratorComment from 'features/listComment/useIteratorComment'

export const useReactAndReply = (
    reactStrategy: ReactStrategy,
    commentStrategy: CommentStrategy
) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    const reply = useAppSelector((state) =>
        state.comment.current.find(
            (possess) => possess._id === commentStrategy.possess._id
        )
    )
    const iterator = useIteratorComment(commentStrategy.possess)
    const [isCommentLoading, setIsCommentLoading] = useState(false)
    const [isJoinReply, setIsJoinCommtent] = useState(false)

    const [isPopupReactTable, setIsPopupReactTable] = useState(false)
    const [isReactLoading, setIsReactLoading] = useState(false)
    const myReact = useMemo<IDisplayCriterionReactType | undefined>(() => {
        if (!user) return undefined
        const react = reactStrategy.possess.reacts.find(
            (r) => (r.owner as IPublicInfo)._id === user._id
        )
        if (!react) return undefined
        return displayPostReact.find((emoji) => emoji.label === react.label)
    }, [reactStrategy.possess.reacts])

    const reactCounter = useMemo(() => {
        const counter: { [key: string]: IReact[] } = {}
        for (const react of reactStrategy.possess.reacts) {
            if (!counter[react.label]) counter[react.label] = []
            counter[react.label].push(react)
        }
        return counter
    }, [reactStrategy.possess.reacts])

    const sendReact = async (emoji: IEmoji) => {
        if (!user || !socket) return
        const reacted = reactStrategy.possess.reacts.find(
            (r) => (r.owner as IPublicInfo)._id === user._id
        )
        if (reacted) {
            if (reacted.label === emoji.label) {
                const { _id, possess } = reacted
                socket.emit(
                    `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/deleteReact`,
                    possess,
                    _id
                )
                dispatch(
                    reactStrategy.getReduxActions().deleteReact({
                        reactId: _id,
                        possessId: reactStrategy.possess._id,
                    })
                )
                await reactAPI.deleteReact(_id)
            } else {
                const updatedReact: IReact = { ...reacted, ...emoji }
                dispatch(
                    reactStrategy.getReduxActions().addOrUpdateReact({
                        react: updatedReact,
                        possessId: reactStrategy.possess._id,
                    })
                )
                await reactAPI.updateReact(updatedReact)
            }
        } else {
            const newReact: Omit<IReact, '_id'> = {
                ...emoji,
                owner: user._id,
                possess: reactStrategy.possess._id,
            }
            setIsReactLoading(true)
            const res = await reactStrategy.getReactAPI().addReact(newReact)
            const savedReact = await reactAPI.getReact(res.data as any)
            dispatch(
                reactStrategy.getReduxActions().addOrUpdateReact({
                    react: savedReact.data,
                    possessId: reactStrategy.possess._id,
                })
            )
            setIsReactLoading(false)
        }
    }

    const setJoinReply = async () => {
        setIsJoinCommtent((pre) => {
            if (commentStrategy.possess.levelOrder >= 3) return false

            if (!pre) {
                iterator.setIsHasMore(true)
                getReplies()
                    .then(() => {})
                    .catch((e) => console.log(e))
                dispatch(commentActions.addPossess(commentStrategy.possess))
            } else dispatch(commentActions.removePossess(commentStrategy.possess._id))
            return !pre
        })
    }
    const getReplies = async () => {
        try {
            setIsCommentLoading(true)
            await iterator.getMore()
        } catch (e) {
            console.log(e)
        } finally {
            setIsCommentLoading(false)
        }
    }
    return {
        isJoinReply,
        setJoinReply,
        sendReact,
        isCommentLoading,
        setIsCommentLoading,
        myReact,
        reactDefault: displayPostReact[0],
        isReactLoading,
        setIsReactLoading,
        isPopupReactTable,
        setIsPopupReactTable,
        reactCounter,
        reply,
        iterator,
        getReplies,
    }
}
