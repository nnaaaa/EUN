import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import { postAPI } from 'api/rest'
import EditPost from 'features/listPost/crudPost'
import { CRUDType } from 'features/listPost/crudPost/crudTool'
import EditType from 'features/listPost/crudPost/crudTool/edit'
import { IPost } from 'models/post'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'
import { useStyle } from './styles'

interface IOptionProps {
    post: IPost
    setIsOpenCRUDButtons: Dispatch<SetStateAction<boolean>>
}

const CRUDButtons = (props: IOptionProps) => {
    const style = useStyle()
    const { post, setIsOpenCRUDButtons } = props
    const [isPopup, setPopup] = useState(false)
    const editType = useMemo<CRUDType>(() => new EditType(post), [post])
    const dispatch = useAppDispatch()
    const removePost = async () => {
        setIsOpenCRUDButtons(false)
        await postAPI.delete(post._id)
        dispatch(postActions.deletePost(post._id))
    }

    return (
        <Box p={1} display="flex" flexDirection="column">
            <Button
                size="small"
                className={style.button}
                onClick={() => setPopup(true)}
                startIcon={<FontAwesomeIcon icon={faEdit} color="#999" size="sm" />}
            >
                <Typography variant="subtitle1">Edit</Typography>
            </Button>
            <Button
                size="small"
                className={style.button}
                onClick={removePost}
                startIcon={<FontAwesomeIcon icon={faTimes} color="#999" size="sm" />}
            >
                <Typography variant="subtitle1">Delete</Typography>
            </Button>

            <EditPost
                isPopup={isPopup}
                setPopup={(isOpen) => {
                    setPopup(isOpen)
                    setIsOpenCRUDButtons(isOpen)
                }}
                type={editType}
            />
        </Box>
    )
}

export default CRUDButtons
