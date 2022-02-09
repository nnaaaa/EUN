import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Stack, Tooltip } from '@mui/material'
import InputImage from 'components/images/input'
import PreviewImages from 'components/images/output'
import { useContent } from 'hooks/useContent'
import { useReactAndReply } from 'hooks/useReactAndReply'
import { IComment } from 'models/comment'
import { FormEvent, useState } from 'react'
import Loading from 'screens/loading'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { Branch, Trunk } from '../styles'
import { StatusInput, useStyle } from './styles'
import Helper from 'helpers/comment'

interface ICreateCommentProps {
    interactHook: ReturnType<typeof useReactAndReply>
}

function CreateComment({ interactHook }: ICreateCommentProps) {
    const { inputContentRef, commentStrategy, reply } = interactHook
    const {
        possess: { levelOrder, _id },
    } = commentStrategy

    const style = useStyle()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    const [isSending, setIsSending] = useState<boolean>(false)
    const { inputImages, previewImages, setContent, content, getContentAndImages } =
        useContent(inputContentRef)

    const sendComment = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (isSending) return
            setIsSending(true)
            if (isSending) return
            const comment = getContentAndImages()
            if (comment) {
                comment.levelOrder = levelOrder + 1
                const res = await commentStrategy.getCommentAPI().addComment(comment, _id)
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
        <Stack direction="row" position="relative">
            {levelOrder >= 1 && reply && reply.comments.length > 0 ? <Trunk /> : <></>}
            {levelOrder >= 1 ? <Branch /> : <></>}

            <Avatar src={user.avatar} />
            <Stack flex={1} ml={1} alignItems="center">
                <form onSubmit={sendComment} className={style.form}>
                    <StatusInput
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Nhập bình luận"
                        ref={inputContentRef}
                    />
                    <Tooltip title={Helper.choseImages} placement="top">
                        <Box className={style.tool}>
                            <InputImage onChange={inputImages}>
                                <FontAwesomeIcon icon={faFileImage} />
                            </InputImage>
                        </Box>
                    </Tooltip>
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
