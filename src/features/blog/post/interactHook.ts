import { postAPI } from 'api/rest';
import { IEmotionList, IPost } from 'models/post';
import { FormEvent, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'states/hooks';

export interface IUpdateEmotionType{
    type: IEmotionList
    isReacted:boolean
}

export const useInteraction = (postInfo: IPost) => {
    //     const {owner, content, react, _id, mode, comments, images, createAt} = info
    const user = useAppSelector(state => state.user.current)
    //   const inputComment = useRef(null)
    //   const optionRef = useRef(null)
    const [toggleOption, setToggleOption] = useState(false)
    const [err, setErr] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const isReacted = useMemo(() => {
        return false
    }, [])
    const [isJoin, setIsJoin] = useState(false)
    const [listReact, setListReact] = useState([])
    //   const [owner, setOwner] = useState({})
    const [countComment, setCountComment] = useState(0)

    const dispatch = useAppDispatch()

    //   useWatchDoc('posts', id, dispatch, Actions.updatePostComment)

    const sendComment = async (e: FormEvent<HTMLFormElement>) => {
        // e.preventDefault()
        // const content = inputComment.current.value
        // inputComment.current.value = ''
        // await updateDocument('posts', id, {
        //     comments: firebase.firestore.FieldValue.arrayUnion({
        //         content,
        //         uid: myUid,
        //         avatar: myAvatar,
        //         name: myName,
        //         createAt: firebase.firestore.Timestamp.now(),
        //     }),
        // })
    }
    const getListReact = async () => {
        // const user = await getDocument('users', {
        //     field: 'uid',
        //     operator: 'in',
        //     value: [...reacts.like, ...reacts.heart],
        // })
        // setListReact(user)
    }
    //update on my react
    const sendReact = async (selected: IEmotionList) => {
        if (!postInfo.react)
            return 
        await postAPI.updateEmotion(postInfo._id,selected)
    }
    const getMyEmotion = () => {
        console.log(postInfo)
        if (!postInfo.react)
            return 
        for (const emotion of Object.keys(postInfo.react) as IEmotionList[]) {
            for (const u of postInfo.react[emotion]) {
                if (u._id == user._id)
                    return emotion
            }
        }
    }
    const setJoin = () => setIsJoin((pre) => !pre)

    return { isJoin, setJoin, sendReact, getMyEmotion }
}
