import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import EditPost from 'features/blog/crudPost'
import { CRUDType } from 'features/blog/crudPost/type'
import EditType from 'features/blog/crudPost/type/edit'
import { IPost } from 'models/post'
import { useMemo, useState } from 'react'
import { useStyle } from './styles'

interface IOptionProps {
    post: IPost
}

const Options = (props: IOptionProps) => {
    const style = useStyle()
    const [isPopup, setPopup] = useState(false)
    const editType = useMemo<CRUDType>(() => new EditType(props.post), [props.post])
    const removePost = async () => {}

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

            <EditPost isPopup={isPopup} setPopup={setPopup} type={editType} />
        </Box>
    )
}

export default Options
