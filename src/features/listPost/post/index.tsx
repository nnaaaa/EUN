import { Box, CardMedia, Collapse, Divider } from '@mui/material'
import { useCommentSocket } from 'api/socket/comment'
import { useReactSocket } from 'api/socket/react'
import DisplayGridImages from 'components/images/output2'
import ListComment from 'features/listComment'
import CreateComment from 'features/listComment/comment/crudComment/create'
import CommentToPost from 'features/listComment/strategies/commentToPost'
import EmojiCounter from 'features/listReact'
import ReactToPost from 'features/listReact/strategies/reactToPost'
import ReactTableDisplay from 'features/listReact/tableDisplay'
import { useReactAndReply } from 'hooks/useReactAndReply'
import { IPost } from 'models/post'
import { useMemo } from 'react'
import { useAppSelector } from 'states/hooks'
import CardHeader from './header'
import InteractBar from './interactBar'
import { CardContent, CardMargin } from './styles'

export default function Post(post: IPost) {
    const reply = useAppSelector((state) =>
        state.comment.current.find((possess) => possess._id === post._id)
    )
    const reactToPost = useMemo(
        () => new ReactToPost({ _id: post._id, reacts: post.reacts }),
        [post]
    )
    const commentToPost = useMemo(
        () =>
            new CommentToPost({
                _id: post._id,
                comments: reply ? reply.comments : [],
                levelOrder: 0,
            }),
        [post, reply]
    )
    const interactHook = useReactAndReply(reactToPost, commentToPost)

    const { owner, images, content, reacts } = post

    useCommentSocket(commentToPost)
    useReactSocket(reactToPost)

    return (
        <CardMargin>
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
            <Collapse in={interactHook.isJoinReply}>
                <Box px={2} pt={0} pb={1}>
                    <Divider />
                    <CreateComment commentStrategy={commentToPost} />
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
