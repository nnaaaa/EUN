import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import { postAPI } from 'api/rest'
import { commentAPI } from 'api/rest/list/comment'
import { FACEBOOK_DB } from 'config/keys'
import { IComment } from 'models/comment'
import { Dispatch, SetStateAction, useContext } from 'react'
import { SocketContext } from 'states/context/socket'
import { useStyle } from './styles'

interface IOptionProps {
    comment: IComment
    setOpenOption: Dispatch<SetStateAction<boolean>>
    setIsEdit: Dispatch<SetStateAction<boolean>>
}

const CRUDButtons = (props: IOptionProps) => {
    const style = useStyle()
    const { socket } = useContext(SocketContext)
    const removeComment = async () => {
        if (!socket) return
        props.setOpenOption(false)
        const { _id, possess } = props.comment
        socket.emit(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.comments}/deleteComment`,
            possess,
            _id
        )
        await commentAPI.deleteComment(_id)
    }

    return (
        <Box p={1} display="flex" flexDirection="column">
            <Button
                size="small"
                className={style.button}
                onClick={() => {
                    props.setIsEdit(true)
                    props.setOpenOption(false)
                }}
                startIcon={<FontAwesomeIcon icon={faEdit} color="#999" size="sm" />}
            >
                <Typography variant="subtitle1">Edit</Typography>
            </Button>
            <Button
                size="small"
                className={style.button}
                onClick={removeComment}
                startIcon={<FontAwesomeIcon icon={faTimes} color="#999" size="sm" />}
            >
                <Typography variant="subtitle1">Delete</Typography>
            </Button>
        </Box>
    )
}

export default CRUDButtons
