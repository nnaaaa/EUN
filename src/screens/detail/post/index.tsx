import { useLocation } from 'react-router-dom'
import Post from 'features/listPost/post/display/particularity'
import { IPost } from 'models/post'
import { Box } from '@mui/material'
import { Element, Link, scroller } from 'react-scroll'
import { useEffect, useMemo } from 'react'

interface ILocationStates {
    post: IPost
    path: string
}

function PostDetail() {
    const {
        state: { post, path },
    } = useLocation<ILocationStates>()

    const concentratedCommentId = path.split('/')[4]

    return <Post post={post} concentratedCommentId={concentratedCommentId} />
}

export default PostDetail
