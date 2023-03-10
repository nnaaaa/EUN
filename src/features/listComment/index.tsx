import { LoadingButton } from '@mui/lab'
import { Box, Stack } from '@mui/material'
import { useReactAndReply } from 'hooks/useReactAndReply'
import Comment from './comment'
import CreateComment from './comment/crudComment/create'

interface IListCommentProps {
    interactHook: ReturnType<typeof useReactAndReply>
}

function ListComment({ interactHook }: IListCommentProps) {
    const {
        reply,
        iterator: { isHasMore },
        getReplies,
        isGettingComment,
    } = interactHook

    return (
        <Stack flexDirection="row" overflow="hidden" sx={{ width: '100%' }}>
            <Box sx={{ width: '100%' }}>
                <CreateComment interactHook={interactHook} />

                {reply &&
                    reply.comments.map((comment, index, comments) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            isLastComment={index === comments.length - 1}
                        />
                    ))}
                {isHasMore ? (
                    <LoadingButton
                        loading={isGettingComment}
                        sx={{ textTransform: 'inherit', ml: 6, width: 'fit-content' }}
                        size="small"
                        onClick={getReplies}
                    >
                        View more comments
                    </LoadingButton>
                ) : (
                    <></>
                )}
            </Box>
        </Stack>
    )
}

export default ListComment
