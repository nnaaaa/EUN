import { Box, CardMedia, Collapse, Divider, Grid } from '@mui/material'
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
import { ID } from 'models/index'
import { IPost } from 'models/post'
import { IPublicInfo } from 'models/user'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { useAppSelector } from 'states/hooks'
import CardHeader from '../header'
import InteractBar from '../interactBar'
import { PostContext } from '../postContext'
import { CardContent, CardLoading, CardMargin } from '../styles'

interface IPostProps {
    post: IPost
    concentratedCommentId: ID
}

export default function Post({ post, concentratedCommentId }: IPostProps) {
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
    const interactHook = useReactAndReply(reactToPost, commentToPost, 20)
    usePostSocket(_id)
    useCommentSocket(commentToPost)
    useReactSocket(reactToPost)

    useEffect(() => {
        interactHook
            .setJoinReply()
            .then(() => {})
            .catch((e) => console.error(e))
    }, [])

    return (
        <Grid container>
            <Grid item xs={6}>
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

                    <ReactTableDisplay
                        counter={interactHook.reactCounter}
                        open={interactHook.isPopupReactTable}
                        onClose={() => interactHook.setIsPopupReactTable(false)}
                    />
                </CardMargin>
            </Grid>
            <Grid item xs={6}>
                <CardMargin sx={{ ml: 2, p: 2 }}>
                    <ListComment interactHook={interactHook} />
                </CardMargin>
            </Grid>
        </Grid>
    )
}
