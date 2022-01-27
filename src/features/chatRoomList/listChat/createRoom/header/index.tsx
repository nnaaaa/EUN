import {
    faMinusCircle,
    faPhone,
    faTimes,
    faVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { IChatRoom } from 'models/chatRoom'
import { IUser } from 'models/user'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'
import { IconBox } from '../chatStyles'
import { NameOfFriend } from './headerStyles'

interface IProps {
    // room: IChatRoom
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

function Header({setIsOpen}: IProps) {
    const user = useAppSelector((state) => state.user.current)
    const dispatch = useAppDispatch()
    // const friend = useMemo<IUser>(() => {
    //     return room.members.find((member) => member._id !== user?._id) as IUser
    // }, [room.members, user?._id])

    // const closeChat = () => dispatch(chatActions.closeWindowChat(room._id))

    return (
        <Box p={1} display="flex" justifyContent="space-between" height="60px" alignItems='center'>
            <Typography
                noWrap
                fontSize={16}
                fontWeight="bold"
                color="black"
            >
                New message
            </Typography>

            <IconBox onClick={()=>setIsOpen(false)}>
                <FontAwesomeIcon icon={faTimes} />
            </IconBox>
        </Box>
    )
}

export default Header
