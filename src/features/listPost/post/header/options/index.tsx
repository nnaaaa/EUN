import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Popover } from '@mui/material'
import { IPost } from 'models/post'
import { useRef, useState } from 'react'
import CRUDButtons from '../../crudButtons'

interface IOptionsProps {
    post: IPost
}

function Options({ post }: IOptionsProps) {
    const toggleBtnRef = useRef(null)
    const [isToggle, setIsToggle] = useState(false)
    return (
        <>
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
        </>
    )
}

export default Options
