import { FormEvent, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'

export const useInteraction = () => {
    //     const {owner, content, react, _id, mode, comments, images, createAt} = info
    //   const { avatar, username, _id: myId } = useAppSelector(state => state.user.current)
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
    const setReact = async (type: any) => {
        // if (reacts[type].includes(myUid)) {
        //     await updateDocument('posts', id, {
        //         reacts: {
        //             like: reacts.like.filter((uid) => uid !== myUid),
        //             heart: reacts.heart,
        //         },
        //     })
        // } else {
        //     await updateDocument('posts', id, {
        //         reacts: {
        //             like: [...reacts.like, myUid],
        //             heart: reacts.heart,
        //         },
        //     })
        // }
    }
    const setJoin = () => setIsJoin((pre) => !pre)

    return { isJoin, setJoin, setReact, isReacted }
}
