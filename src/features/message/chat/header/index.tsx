import {
    faMinusCircle,
    faPhone,
    faTimes,
    faVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@mui/material'
import { Box } from '@mui/system'
import { ID } from 'models/Common'
import { IUser } from 'models/user'
import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { IconBox } from '../chatStyles'
import { NameOfFriend } from './headerStyles'
import { actions } from '../../chatSlice'
import { IChatRoom } from 'models/chatRoom'


function Header(props: IChatRoom) {
    const user = useAppSelector((state) => state.user.current)
    const dispatch = useAppDispatch()
    const friend = useMemo<IUser>(() => {
        return (props.members as IUser[]).find(
            (member) => member._id !== user?._id
        ) as IUser
    }, [])

    const closeChat = () => dispatch(actions.closeChat(props._id))

    return (
        <Box p={1} display="flex" justifyContent="space-between" height="60px">
            <Box display="flex" alignItems="center" maxWidth="50%">
                <Avatar src={friend.avatar} />
                <NameOfFriend>{friend.username}</NameOfFriend>
            </Box>
            <Box display="flex" alignItems="center">
                <IconBox>
                    <FontAwesomeIcon icon={faVideo} />
                </IconBox>
                <IconBox>
                    <FontAwesomeIcon icon={faPhone} />
                </IconBox>
                <IconBox>
                    <FontAwesomeIcon icon={faMinusCircle} />
                </IconBox>
                <IconBox onClick={closeChat}>
                    <FontAwesomeIcon icon={faTimes} />
                </IconBox>
            </Box>
        </Box>
    )
}

export default Header
