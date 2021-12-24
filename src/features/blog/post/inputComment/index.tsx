import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, IconButton, Stack } from '@mui/material'
import { postAPI } from 'api/rest'
import InputImage from 'components/images/input'
import PreviewImages from 'components/images/output'
import { useBlockingSpam } from 'hooks/useBlockingSpam'
import { useContent } from 'hooks/useContent'
import { IPost } from 'models/post'
import { FormEvent, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'
import { StatusInput, useStyle } from './styles'

interface IInputCommentProps {
    post: IPost
}

function InputComment(props: IInputCommentProps) {
    const style = useStyle()
    const inputContent = useRef<null | HTMLInputElement>(null)
    const { avatar } = useAppSelector((state) => state.user.current)
    const [isSending, setIsSending] = useState<boolean>(false)
    const { inputImages, previewImages, setContent, content, getContentAndImages } =
        useContent(inputContent)
    const { isAllow, setCountCurSpam, timeToAllow } = useBlockingSpam(5000, 10)
    const dispatch = useAppDispatch()
    const sendComment = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (isSending || !isAllow) return
            setCountCurSpam()
            setIsSending(true)
            if (isSending) return
            const comment = getContentAndImages()
            if (comment) await postAPI.addComment(comment, props.post._id)
            setIsSending(false)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Stack mb={2} mt={1} direction="row">
            <Avatar src={avatar} />
            <Stack flex={1} ml={1} alignItems="center">
                <form onSubmit={sendComment} className={style.form}>
                    <StatusInput
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Nhập bình luận"
                        ref={inputContent}
                    />
                    <IconButton size="small" className={style.tool}>
                        <InputImage onChange={inputImages}>
                            <FontAwesomeIcon icon={faFileImage} />
                        </InputImage>
                    </IconButton>
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

export default InputComment
