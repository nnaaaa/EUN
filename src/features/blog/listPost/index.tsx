import Post from '../post'

import { Ref, RefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, CircularProgress } from '@mui/material'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'

interface IListPostProps {
    type: 'all' | 'friend'
    friendAccount?: string
}

export default function ListPost({ type = 'all', friendAccount }: IListPostProps) {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    // const listPost = useSelector((state) => state.listPost)
    // const [lastVisible, setLastVisible] = useState(null)
    // const [postFromWho, setPostFromWho] = useState(null)

    const [reload, setReload] = useState(false)
    const { current, loading, error } = useAppSelector((state) => state.post)

    // const [loading, setLoading] = useState(true)
    // const [isLoadingMore, setIsLoadingMore] = useState(false)
    // const [errorLoadMore, setErrorLoadMore] = useState(false)
    const timeoutLoadMore: { current: NodeJS.Timeout | null } = useRef(null)
    const limit = 5

    // const checkDuplicate = useCallback(
    //     (newData) => {
    //         if (!newData || !listPost || !newData.length || !listPost.length)
    //             return false
    //         const duplicateArr = newData.filter(
    //             (data) => data.id === listPost?.[0]?.id
    //         )
    //         if (!duplicateArr.length) return false
    //         return true
    //     },
    //     [listPost]
    // )

    //load data at first time
    useEffect(() => {
        const loadPost = async () => {
            await dispatch(postActions.getTheFirstTime(user._id))
        }
        loadPost().then(() => {})
    }, [])

    //load data when scroll to bottom
    // useEffect(() => {
    //     const fetchMorePost = () => {
    //         if (timeoutLoadMore.current) clearTimeout(timeoutLoadMore.current)
    //         timeoutLoadMore.current = setTimeout(() => {
    //             if (
    //                 window.innerHeight + window.pageYOffset >=
    //                 document.body.offsetHeight
    //             ) {

    //             }
    //         }, 100)
    //     }
    //     window.addEventListener('scroll', fetchMorePost)
    //     return () => {
    //         window.removeEventListener('scroll', fetchMorePost)
    //     }
    // }, [postFromWho, dispatch, lastVisible, checkDuplicate, reload])

    if (loading)
        return (
            <Box width="100%" display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        )

    return (
        <>
            {current.map((post) => (
                <Post key={post._id} {...post} />
            ))}
            {/* {isLoadingMore && (
                <Box display="flex" justifyContent="center" mb={2}>
                    <CircularProgress />
                </Box>
            )}
            {errorLoadMore && (
                <Box display="flex" justifyContent="center" mb={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setLastVisible(null)
                            setLoading(true)
                            setReload(true)
                        }}
                    >
                        Reload
                    </Button>
                </Box>
            )} */}
        </>
    )
}
