import { Box, CardMedia, Collapse, Divider } from '@mui/material'
import { useCommentSocket } from 'api/socket-user/comment'
import { usePostSocket } from 'api/socket-user/post'
import { useReactSocket } from 'api/socket-user/react'
import DisplayGridImages from 'components/images/output2'
import ListComment from 'features/listComment'
import CommentToPost from 'features/listComment/strategies/commentToPost'
import EmojiCounter from 'features/listReact'
import ReactToPost from 'features/listReact/strategies/reactToPost'
import ReactTableDisplay from 'features/listReact/tableDisplay'
import { useReactAndReply } from 'hooks/useReactAndReply'
import { IPost } from 'models/post'
import { IPublicInfo } from 'models/user'
import { useContext, useMemo } from 'react'
import { useAppSelector } from 'states/hooks'
import PostContent from '../content'
import CardHeader from '../header'
import InteractBar from '../interactBar'
import { PostContext } from '../postContext'
import { CardContent, CardLoading, CardStyled } from '../styles'

export default function Post(post: IPost) {
    const { isLoading } = useContext(PostContext)
    const { owner, images, content, reacts, _id, participants } = post

    const reply = useAppSelector((state) =>
        state.comment.current.find((possess) => possess._id === _id)
    )
    const reactToPost = useMemo(
        () => new ReactToPost({ _id, reacts, participants }),
        [post]
    )
    const commentToPost = useMemo(
        () =>
            new CommentToPost({
                _id,
                replies: reply ? reply.comments : [],
                levelOrder: 0,
                participants,
                owner: owner as IPublicInfo,
            }),
        [post, reply]
    )
    const interactHook = useReactAndReply(reactToPost, commentToPost)

    usePostSocket(_id)
    useCommentSocket(commentToPost)
    useReactSocket(reactToPost)

    return (
        <CardStyled>
            {isLoading && <CardLoading />}

            <CardHeader post={post} />

            <PostContent post={post} />

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
        </CardStyled>
    )
}
