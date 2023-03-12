import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Popover, Switch, Tooltip } from '@mui/material'
import Switcher from 'components/switcher'
import { IPost } from 'models/post'
import { useContext, useRef, useState } from 'react'
import CRUDButtons from '../../crudButtons'
import { PostContext } from '../../postContext'
import Helper from 'helpers/comment'

interface IOptionsProps {
    post: IPost
}

function Options({ post }: IOptionsProps) {
    const toggleBtnRef = useRef(null)
    const [isToggle, setIsToggle] = useState(false)
    const { setIsDisplayNERContent } = useContext(PostContext)

    const toggleNERContent = () => {
        if (setIsDisplayNERContent) {
            setIsDisplayNERContent((prev) => !prev)
        }
    }

    return (
        <Box display="flex" alignItems="center">
                <Tooltip title={Helper.ner} placement="top">
            <Box mr={4}>
                    <Switcher label='NER' defaultChecked onClick={toggleNERContent} />
            </Box>
                </Tooltip>
            <IconButton
                color="primary"
                size="small"
                ref={toggleBtnRef}
                onClick={() => setIsToggle(true)}
            >
                <FontAwesomeIcon icon={faEllipsisH} />
            </IconButton>
            <Popover
                open={isToggle}
                anchorEl={toggleBtnRef.current}
                onClose={() => setIsToggle(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <CRUDButtons post={post} setIsOpenCRUDButtons={setIsToggle} />
            </Popover>
        </Box>
    )
}

export default Options
