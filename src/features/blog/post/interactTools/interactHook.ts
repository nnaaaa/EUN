import { IPublicInfo } from './../../../../models/user';
import { postAPI } from 'api/rest';
import { useReactSocket } from 'api/socket/react';
import { IPost } from 'models/post';
import { IEmotionList, IReact } from 'models/react';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'states/hooks';
import { postActions } from 'states/slices/postSlice';

export interface IUpdateEmotionType{
    type: IEmotionList
    isReacted:boolean
}

export const useInteraction = (postInfo: IPost) => {
    const user = useAppSelector(state => state.user.current)
    const [toggleOption, setToggleOption] = useState(false)
    const [err, setErr] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isReacted, setIsReacted] = useState(false)
    const [isJoinComment, setIsJoinCommtent] = useState(false)
    const dispatch = useAppDispatch()
    useReactSocket(postInfo._id,postInfo.react._id)


    //update on my react
    const sendReact = async (selected: IEmotionList) => {
        if (!postInfo.react)
            return 
        
        let react = { ...postInfo.react }
        
        let isOtherReact = false
        let isReacted = false
        for (const type of Object.keys(react)) {
            if (type == '_id')
                continue
            const listUser = react[type as IEmotionList] as IPublicInfo[]
            react[type as IEmotionList] = listUser.filter(u => {
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
        dispatch(postActions.updateReact({ react, postId:postInfo._id }))
        await postAPI.updateEmotion(postInfo.react._id,selected)
    }

    const getMyEmotion = () => {
        if (!postInfo.react)
            return 
        for (const emotion of Object.keys(postInfo.react)) {
            if (emotion == '_id')
                continue
            for (const u of postInfo.react[emotion as IEmotionList]) {
                if (u._id == user._id) {
                    setIsReacted(true)
                    return emotion
                }
            }
        }
        setIsReacted(false)
        return 'Like'
    }
    const setJoin = () => setIsJoinCommtent((pre) => !pre)

    return { isJoinComment, setJoin, sendReact, getMyEmotion,isReacted }
}
