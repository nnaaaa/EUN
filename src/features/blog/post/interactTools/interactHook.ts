import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { blue } from '@mui/material/colors'
import { postAPI } from 'api/rest'
import { IPost } from 'models/post'
import { IEmotionList } from 'models/react'
import { IPublicInfo } from 'models/user'
import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'

export interface IUpdateEmotionType {
    type: IEmotionList
    isReacted: boolean
}

interface IDisplayReactType {
    text: IEmotionList
    image: IconDefinition
    color: any
}

const displayReact: Record<IEmotionList, IDisplayReactType> = {
    like: {
        text: 'like',
        image: faThumbsUp,
        color: blue[500],
    },
    love: {
        text: 'love',
        image: faHeart,
        color: '#F55470',
    },
    haha: {
        text: 'love',
        image: faHeart,
        color: blue[500],
    },
    wow: {
        text: 'love',
        image: faHeart,
        color: blue[500],
    },
    sad: {
        text: 'love',
        image: faHeart,
        color: blue[500],
    },
    angry: {
        text: 'love',
        image: faHeart,
        color: blue[500],
    },
}

export const useInteraction = (postInfo: IPost) => {
    const user = useAppSelector((state) => state.user.current)

    const [toggleOption, setToggleOption] = useState(false)
    const [err, setErr] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isReacted, setIsReacted] = useState(false)
    const [isJoinComment, setIsJoinCommtent] = useState(false)
    const dispatch = useAppDispatch()
    const myReact = useMemo<IDisplayReactType>(() => {
        if (!user)
            return displayReact['like']
        if (!postInfo.react) return displayReact['like']
        for (const emotion of Object.keys(postInfo.react)) {
            if (emotion == '_id') continue
            for (const u of postInfo.react[emotion as IEmotionList]) {
                if (u._id == user._id) {
                    setIsReacted(true)
                    return displayReact[emotion as IEmotionList]
                }
            }
        }
        setIsReacted(false)
        return displayReact['like']
    }, [postInfo.react, setIsReacted])

    //update on my react
    const sendReact = async (selected: IEmotionList) => {
        if (!postInfo.react || !user) return

        let react = { ...postInfo.react }

        let isOtherReact = false
        let isReacted = false
        for (const type of Object.keys(react)) {
            if (type == '_id') continue
            const listUser = react[type as IEmotionList] as IPublicInfo[]
            react[type as IEmotionList] = listUser.filter((u) => {
                if (u._id == user._id && type == selected) {
                    isReacted = true
                    return false
                }
                if (u._id == user._id) {
                    isReacted = true
                    isOtherReact = true
                    return false
                }
                return true
            })
        }
        if ((isOtherReact && isReacted) || !isReacted)
            react[selected as IEmotionList].push(user as IPublicInfo)
        dispatch(postActions.updateReact({ react, postId: postInfo._id }))
        await postAPI.updateEmotion(postInfo.react._id, selected)
    }

    const setJoin = () => setIsJoinCommtent((pre) => !pre)

    return { isJoinComment, setJoin, sendReact, isReacted, myReact }
}
