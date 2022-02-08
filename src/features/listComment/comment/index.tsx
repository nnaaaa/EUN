import { Avatar, Box, Collapse, Divider } from '@mui/material'
import { useCommentSocket } from 'api/socket/comment'
import { useReactSocket } from 'api/socket/react'
import EmojiCounter from 'features/listReact'
import ReactToComment from 'features/listReact/strategies/reactToComment'
import ReactTableDisplay from 'features/listReact/tableDisplay'
import { useReactAndReply } from 'hooks/useReactAndReply'
import { IComment } from 'models/comment'
import { IPublicInfo } from 'models/user'
import { useMemo, useState } from 'react'
import { useAppSelector } from 'states/hooks'
import ListComment from '..'
import CommentToReply from '../strategies/commentToComment'
import CreateComment from './crudComment/create'
import EditComment from './crudComment/edit'
import DisplayContent from './displayContent'
import DisplayCrudButton from './displayCrudButton'
import InteractBar from './interactBar'
import className from './style.module.scss'

interface ICommentProps {
    comment: IComment
}

export default function Comment({ comment }: ICommentProps) {
    const reply = useAppSelector((state) =>
        state.comment.current.find((possess) => possess._id === comment._id)
    )
    const reactToComment = useMemo(
        () => new ReactToComment({ _id: comment._id, reacts: comment.reacts }),
        [comment]
    )
    const commentToReply = useMemo(
        () =>
            new CommentToReply({
                _id: comment._id,
                comments: reply ? reply.comments : [],
                levelOrder: comment.levelOrder,
            }),
        [comment, reply]
    )
    const interactHook = useReactAndReply(reactToComment, commentToReply)
    const { owner } = comment
    const { avatar } = owner as IPublicInfo

    const [isEdit, setIsEdit] = useState(false)

    useReactSocket(reactToComment)
    useCommentSocket(commentToReply)

    if (isEdit) return <EditComment initComment={comment} setIsEdit={setIsEdit} />

    return (
        <Box mb={0.5}>
            <Box className={className.comment}>
                <Avatar src={avatar} />
                <Box ml={1}>
                    <Box className={className.content}>
                        <Box className={className.wrapContent}>
                            <DisplayContent comment={comment} />
                            <Box
                                className={className.displayEmoji}
                                borderRadius={10}
                                onClick={() => interactHook.setIsPopupReactTable(true)}
                            >
                                <EmojiCounter
                                    counter={interactHook.reactCounter}
                                    reacts={comment.reacts}
                                />
                            </Box>
                        </Box>
                        <DisplayCrudButton comment={comment} setIsEdit={setIsEdit} />
                    </Box>
                    <Box>
                        <InteractBar interactHook={interactHook} />
                    </Box>
                </Box>
            </Box>
            <Collapse in={interactHook.isJoinReply}>
                <Box pl={6}>
                    <Divider />
                    <CreateComment commentStrategy={commentToReply} />
                    {reply ? <ListComment interactHook={interactHook} /> : <></>}
                </Box>
            </Collapse>

            <ReactTableDisplay
                counter={interactHook.reactCounter}
                open={interactHook.isPopupReactTable}
                onClose={() => interactHook.setIsPopupReactTable(false)}
            />
        </Box>
    )
}
