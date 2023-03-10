import { reactAPI } from 'api/rest/list/react'
import { FACEBOOK_DB } from 'config/keys'
import CommentStrategy from 'features/listComment/strategies'
import useIteratorComment from 'features/listComment/useIteratorComment'
import {
    displayPostReact,
    IDisplayCriterionReactType,
} from 'features/listReact/postCriterion'
import { IEmoji, IReact } from 'models/react'
import { IPublicInfo } from 'models/user'
import { useContext, useMemo, useRef, useState } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { commentActions } from 'states/slices/commentSlice'
import ReactStrategy from '../features/listReact/strategies'

export const useReactAndReply = (
    reactStrategy: ReactStrategy,
    replyStrategy: CommentStrategy,
    limitReplyIterator?: number
) => {
    const dispatch = useAppDispatch()
    const reactsHook = useReacts(reactStrategy)

    const reply = useAppSelector((state) =>
        state.comment.current.find((possess) => possess._id === replyStrategy.possess._id)
    )
    const iterator = useIteratorComment(replyStrategy.possess, limitReplyIterator)
    const [isGettingComment, setIsGettingComment] = useState(false)
    const [isJoinReply, setIsJoinComment] = useState(false)
    const inputContentRef = useRef<null | HTMLInputElement>(null)

    const setJoinReply = async () => {
        setIsJoinComment((pre) => {
            if (replyStrategy.possess.levelOrder >= 5) return false

            if (!pre) {
                iterator.setIsHasMore(true)
                getReplies()
                    .then(() => {})
                    .catch((e) => console.error(e))
                dispatch(commentActions.addPossess(replyStrategy.possess))
                setTimeout(() => {
                    if (inputContentRef.current) inputContentRef.current.focus()
                }, 0)
            } else dispatch(commentActions.removePossess(replyStrategy.possess._id))

            return !pre
        })
    }
    const getReplies = async () => {
        try {
            setIsGettingComment(true)
            await iterator.getMore()
        } catch (e) {
            console.error(e)
        } finally {
            setIsGettingComment(false)
        }
    }

    return {
        isJoinReply,
        setJoinReply,
        isGettingComment,
        setIsGettingComment,
        reply,
        iterator,
        getReplies,
        inputContentRef,
        replyStrategy,
        ...reactsHook,
    }
}

export const useReacts = (reactStrategy: ReactStrategy) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
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

    return {
        sendReact,
        myReact,
        reactDefault: displayPostReact[0],
        isReactLoading,
        setIsReactLoading,
        isPopupReactTable,
        setIsPopupReactTable,
        reactCounter,
    }
}
