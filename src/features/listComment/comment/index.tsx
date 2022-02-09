import { Avatar, Box, Collapse, Stack } from '@mui/material'
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
import EditComment from './crudComment/edit'
import DisplayContent from './displayContent'
import DisplayCrudButton from './displayCrudButton'
import InteractBar from './interactBar'
import className from './style.module.scss'
import { Branch, TopTrunk, Trunk } from './styles'

interface ICommentProps {
    comment: IComment
    isLastComment: boolean
}

export default function Comment({ comment, isLastComment }: ICommentProps) {
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
        <>
            <Stack
                className={className.comment}
                position="relative"
                flexDirection="row"
                alignItems="flex-start"
                sx={{ width: '100%' }}
            >
                {comment.levelOrder > 1 && !isLastComment ? <Trunk /> : <></>}
                {comment.levelOrder > 1 ? <Branch /> : <></>}

                <Box sx={{ width: '100%' }}>
                    <Stack flexDirection="row">
                        <Box>
                            <Avatar src={avatar} sx={{ mb: 1 }} />
                            {comment.levelOrder > 0 && interactHook.isJoinReply ? (
                                <TopTrunk />
                            ) : (
                                <></>
                            )}
                        </Box>
                        <Box ml={1}>
                            <Stack flexDirection="row">
                                <Box className={className.wrapContent}>
                                    <DisplayContent comment={comment} />
                                    <Box
                                        className={className.displayEmoji}
                                        onClick={() =>
                                            interactHook.setIsPopupReactTable(true)
                                        }
                                    >
                                        <EmojiCounter
                                            counter={interactHook.reactCounter}
                                            reacts={comment.reacts}
                                        />
                                    </Box>
                                </Box>
                                <DisplayCrudButton
                                    comment={comment}
                                    setIsEdit={setIsEdit}
                                />
                            </Stack>
                            <Box>
                                <InteractBar interactHook={interactHook} />
                            </Box>
                        </Box>
                    </Stack>

                    <Collapse in={interactHook.isJoinReply} unmountOnExit>
                        <ListComment interactHook={interactHook} />
                    </Collapse>
                </Box>
            </Stack>

            <ReactTableDisplay
                counter={interactHook.reactCounter}
                open={interactHook.isPopupReactTable}
                onClose={() => interactHook.setIsPopupReactTable(false)}
            />
        </>
    )
}
