import { LoadingButton } from '@mui/lab'
import { useReactAndReply } from 'hooks/useReactAndReply'
import Comment from './comment'
import CommentStrategy from './strategies'

interface IListCommentProps {
    interactHook: ReturnType<typeof useReactAndReply>
}

function ListComment({ interactHook }: IListCommentProps) {
    const {
        reply,
        iterator: { isHasMore },
        getReplies,
        isCommentLoading,
    } = interactHook

    if (!reply) return <></>

    return (
        <>
            {reply.comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
            {isHasMore ? (
                <LoadingButton
                    loading={isCommentLoading}
                    sx={{ textTransform: 'inherit', ml: 6 }}
                    size="small"
                    onClick={getReplies}
                >
                    View more comments
                </LoadingButton>
            ) : (
                <></>
            )}
        </>
    )
}

export default ListComment
