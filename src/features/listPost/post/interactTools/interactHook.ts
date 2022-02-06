import { blue, red, yellow } from '@mui/material/colors'
import { reactAPI } from 'api/rest/list/react'
import { FACEBOOK_DB } from 'config/keys'
import { IPost } from 'models/post'
import { IEmoji, IPostEmotionList, IReact } from 'models/react'
import { IPublicInfo } from 'models/user'
import { useContext, useMemo, useState } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'

interface IDisplayPostReactType {
    label: IPostEmotionList
    icon: string
    color: string
}
export const displayPostReact: IDisplayPostReactType[] = [
    {
        label: 'like',
        icon: '👍',
        color: blue[500],
    },
    {
        label: 'love',
        icon: '❤️',
        color: red[500],
    },
    {
        label: 'haha',
        icon: '😆',
        color: yellow[500],
    },
    {
        label: 'wow',
        icon: '😮',
        color: yellow[500],
    },
    {
        label: 'sad',
        icon: '😢',
        color: yellow[500],
    },
    {
        label: 'angry',
        icon: '😡',
        color: red[500],
    },
]

export const useInteraction = (postInfo: IPost) => {
    const user = useAppSelector((state) => state.user.current)

    const { socket } = useContext(SocketContext)
    const [isLoading, setLoading] = useState(false)
    const [isJoinComment, setIsJoinCommtent] = useState(false)
    const dispatch = useAppDispatch()

    const myReact = useMemo<IDisplayPostReactType | undefined>(() => {
        if (!user) return undefined
        const react = postInfo.reacts.find(
            (r) => (r.owner as IPublicInfo)._id === user._id
        )
        if (!react) return undefined
        return displayPostReact.find((emoji) => emoji.label === react.label)
    }, [postInfo.reacts])

    const counter = useMemo(() => {
        const counterObj: { [key: string]: IPublicInfo[] } = {}
        for (const react of postInfo.reacts) {
            if (!counterObj[react.label]) counterObj[react.label] = []
            counterObj[react.label].push(react.owner as IPublicInfo)
        }
        return counterObj
    }, [postInfo.reacts])

    const sendReact = async (emoji: IEmoji) => {
        if (!user || !socket) return
        const reacted = postInfo.reacts.find(
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
                dispatch(postActions.removeReact({ reactId: _id, postId: postInfo._id }))
                await reactAPI.deleteReact(_id)
            } else {
                const updatedReact: IReact = { ...reacted, ...emoji }
                dispatch(
                    postActions.addOrUpdateReact({
                        react: updatedReact,
                        postId: postInfo._id,
                    })
                )
                await reactAPI.updateReact(updatedReact)
            }
        } else {
            const newReact: Omit<IReact, '_id'> = {
                ...emoji,
                owner: user._id,
                possess: postInfo._id,
            }
            setLoading(true)
            const res = await reactAPI.addReactToPost(newReact)
            const savedReact = await reactAPI.getReact(res.data as any)
            dispatch(
                postActions.addOrUpdateReact({
                    react: savedReact.data,
                    postId: postInfo._id,
                })
            )
            setLoading(false)
        }
    }

    const setJoin = () => setIsJoinCommtent((pre) => !pre)

    return {
        isJoinComment,
        setJoin,
        sendReact,
        myReact,
        reactDefault: displayPostReact[0],
        isLoading,
        counter,
    }
}
