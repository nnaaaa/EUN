import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { postAPI } from 'api/rest'
import InputImage from 'components/images/input'
import PreviewImages from 'components/images/output'
import { useContent } from 'hooks/useContent'
import { IComment } from 'models/comment'
import { IPost } from 'models/post'
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from 'react'
import Loading from 'screens/loading'
import { useAppSelector } from 'states/hooks'
import { StatusInput, useStyle } from './styles'

interface IEditCommentProps {
    post: IPost
    initComment: IComment
    setIsEdit: Dispatch<SetStateAction<boolean>>
}

function EditComment({ initComment, post, setIsEdit }: IEditCommentProps) {
    const style = useStyle()
    const inputContent = useRef<null | HTMLInputElement>(null)
    const user = useAppSelector((state) => state.user.current)
    const {
        inputImages,
        previewImages,
        setContent,
        content,
        getContentAndImages,
        setPreviewImages,
    } = useContent(inputContent)

    const editComment = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const comment = getContentAndImages()
            if (comment) {
                setIsEdit(false)
                await postAPI.updateComment({ ...initComment, ...comment }, post._id)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setContent(initComment.content)
        setPreviewImages(initComment.images)
    }, [])

    if (!user) return <Loading />

    return (
        <Stack mb={2} mt={1} direction="row">
            <Avatar src={user.avatar} />
            <Stack flex={1} ml={1} alignItems="center">
                <form onSubmit={editComment} className={style.form}>
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

export default EditComment
