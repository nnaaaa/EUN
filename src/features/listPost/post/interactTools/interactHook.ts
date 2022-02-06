import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faAngry, faLaughSquint, faSadTear, faSurprise,faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { blue,yellow,red } from '@mui/material/colors'
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
    label: IEmotionList
    icon: string
    color: any
}
export const displayReact: Record<IEmotionList, IDisplayReactType> = {
    like: {
        label: 'like',
        icon: '👍',
        color: blue[500],
    },
    love: {
        label: 'love',
        icon: '❤️',
        color: red[500],
    },
    haha: {
        label: 'haha',
        icon: '😆',
        color: yellow[800],
    },
    wow: {
        label: 'wow',
        icon: '😮',
        color: yellow[800],
    },
    sad: {
        label: 'sad',
        icon: '😢',
        color: yellow[800],
    },
    angry: {
        label: 'angry',
        icon: '😡',
        color: red[500],
    },
}

export const useInteraction = (postInfo: IPost) => {
    const user = useAppSelector((state) => state.user.current)
    // const [toggleOption, setToggleOption] = useState(false)
    // const [err, setErr] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isJoinComment, setIsJoinCommtent] = useState(false)
    const dispatch = useAppDispatch()
    const myReact = useMemo<IDisplayReactType | null>(() => {
        if (!user) return null
        if (!postInfo.react) return null
        for (const emotion of Object.keys(postInfo.react)) {
            if (emotion == '_id') continue
            for (const u of postInfo.react[emotion as IEmotionList]) {
                if (u._id == user._id) {
                    return displayReact[emotion as IEmotionList]
                }
            }
        }
        return null
    }, [postInfo.react])
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
            react[selected as IEmotionList].push(user)
        dispatch(postActions.updateReact({ react, postId: postInfo._id }))
        await postAPI.updateEmotion(postInfo.react._id, selected)
    }

    const setJoin = () => setIsJoinCommtent((pre) => !pre)

    return { isJoinComment, setJoin, sendReact, myReact }
}
