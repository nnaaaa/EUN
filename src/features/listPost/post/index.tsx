import { Box, CardMedia, Collapse, Divider } from '@mui/material'
import { useCommentSocket } from 'api/socket/comment'
import { usePostSocket } from 'api/socket/post'
import { useReactSocket } from 'api/socket/react'
import DisplayGridImages from 'components/images/output2'
import ListComment from 'features/listComment'
import CommentToPost from 'features/listComment/strategies/commentToPost'
import EmojiCounter from 'features/listReact'
import ReactToPost from 'features/listReact/strategies/reactToPost'
import ReactTableDisplay from 'features/listReact/tableDisplay'
import { useReactAndReply } from 'hooks/useReactAndReply'
import { IPost } from 'models/post'
import { useContext, useMemo } from 'react'
import { useAppSelector } from 'states/hooks'
import CardHeader from './header'
import InteractBar from './interactBar'
import { PostContext } from './postContext'
import { CardContent, CardLoading, CardMargin } from './styles'

export default function Post(post: IPost) {
    const { isLoading } = useContext(PostContext)
    const { owner, images, content, reacts, _id } = post

    const reply = useAppSelector((state) =>
        state.comment.current.find((possess) => possess._id === _id)
    )
    const reactToPost = useMemo(() => new ReactToPost({ _id, reacts }), [post])
    const commentToPost = useMemo(
        () =>
            new CommentToPost({
                _id,
                comments: reply ? reply.comments : [],
                levelOrder: 0,
            }),
        [post, reply]
    )
    const interactHook = useReactAndReply(reactToPost, commentToPost)

    usePostSocket(_id)
    useCommentSocket(commentToPost)
    useReactSocket(reactToPost)

    return (
        <CardMargin>
            {isLoading && <CardLoading />}

            <CardHeader post={post} />

            {content && <CardContent>{content}</CardContent>}

            <CardMedia>
                <DisplayGridImages images={images} title={owner.username} />
            </CardMedia>

            <Box p={2} pb={1}>
                <Box onClick={() => interactHook.setIsPopupReactTable(true)}>
                    <EmojiCounter
                        reacts={reacts}
                        counter={interactHook.reactCounter}
                        iconSize={18}
                        displayDefault
                    />
                </Box>
                <InteractBar interactHook={interactHook} />
            </Box>
            <Collapse in={interactHook.isJoinReply} unmountOnExit>
                <Box px={2} pt={0} pb={1}>
                    <Divider sx={{ mb: 1 }} />
                    <ListComment interactHook={interactHook} />
                </Box>
            </Collapse>

            <ReactTableDisplay
                counter={interactHook.reactCounter}
                open={interactHook.isPopupReactTable}
                onClose={() => interactHook.setIsPopupReactTable(false)}
            />
        </CardMargin>
    )
}
