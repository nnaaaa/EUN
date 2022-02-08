import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Stack } from '@mui/material'
import InputImage from 'components/images/input'
import PreviewImages from 'components/images/output'
import { useContent } from 'hooks/useContent'
import { FormEvent, useRef, useState } from 'react'
import Loading from 'screens/loading'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { StatusInput, useStyle } from './styles'
import CommentStrategy from '../../strategies'
import { IComment } from 'models/comment'

interface ICreateCommentProps {
    commentStrategy: CommentStrategy
}

function CreateComment({ commentStrategy }: ICreateCommentProps) {
    const style = useStyle()
    const inputContent = useRef<null | HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    const [isSending, setIsSending] = useState<boolean>(false)
    const { inputImages, previewImages, setContent, content, getContentAndImages } =
        useContent(inputContent)

    const sendComment = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (isSending) return
            setIsSending(true)
            if (isSending) return
            const comment = getContentAndImages()
            if (comment) {
                comment.levelOrder = commentStrategy.possess.levelOrder + 1
                const res = await commentStrategy
                    .getCommentAPI()
                    .addComment(comment, commentStrategy.possess._id)
                const savedComment = await commentStrategy
                    .getCommentAPI()
                    .getComment(res.data as string)
                dispatch(
                    commentStrategy
                        .getReduxActions()
                        .addOrUpdateComment(savedComment.data as IComment)
                )
            }
            setIsSending(false)
        } catch (e) {
            console.log(e)
        }
    }

    if (!user) return <Loading />

    return (
        <Stack mb={1} mt={1} direction="row">
            <Avatar src={user.avatar} />
            <Stack flex={1} ml={1} alignItems="center">
                <form onSubmit={sendComment} className={style.form}>
                    <StatusInput
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Nhập bình luận"
                        ref={inputContent}
                    />
                    <Box className={style.tool}>
                        <InputImage onChange={inputImages}>
                            <FontAwesomeIcon icon={faFileImage} />
                        </InputImage>
                    </Box>
                </form>

                <PreviewImages
                    images={
                        previewImages && previewImages.length <= 3 ? previewImages : []
                    }
                    width="80%"
                    infinite
                />
            </Stack>
        </Stack>
    )
}

export default CreateComment
