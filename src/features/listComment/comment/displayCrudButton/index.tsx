import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Popover } from '@mui/material'
import { IComment } from 'models/comment'
import { IPublicInfo } from 'models/user'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useAppSelector } from 'states/hooks'
import CRUDButtons from './crudButtons'
import className from '../style.module.scss'

interface IDisplayCrudButtonProps {
    comment: IComment
    setIsEdit: Dispatch<SetStateAction<boolean>>
}

function DisplayCrudButton({ comment, setIsEdit }: IDisplayCrudButtonProps) {
    const toggleBtnRef = useRef(null)
    const [isToggle, setIsToggle] = useState(false)
    const user = useAppSelector((state) => state.user.current)
    const { owner } = comment
    const { _id } = owner as IPublicInfo

    if (!user) return <></>

    return (
        <>
            {user._id === _id ? (
                <IconButton
                    sx={{
                        ml: 1,
                    }}
                    color="primary"
                    size="small"
                    className={className.editButton}
                    onClick={() => setIsToggle(true)}
                    ref={toggleBtnRef}
                >
                    <FontAwesomeIcon icon={faEllipsisH} />
                </IconButton>
            ) : (
                <></>
            )}

            <Popover
                open={isToggle}
                anchorEl={toggleBtnRef.current}
                onClose={() => setIsToggle(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <CRUDButtons
                    comment={comment}
                    setOpenOption={setIsToggle}
                    setIsEdit={setIsEdit}
                />
            </Popover>
        </>
    )
}

export default DisplayCrudButton
