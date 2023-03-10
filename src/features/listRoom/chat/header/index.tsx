import {
    faMinusCircle,
    faPhone,
    faTimes,
    faVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, AvatarGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import useDisplayChat from 'features/listRoom/useDisplayChat'
import { IChatRoom } from 'models/chatRoom'
import { IPublicInfo } from 'models/user'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'
import { IconBox } from '../chatStyles'

interface IProps {
    room: IChatRoom
    setExpand: Dispatch<SetStateAction<boolean>>
    user: IPublicInfo
}

function Header({ room, setExpand, user }: IProps) {
    const dispatch = useAppDispatch()
    const { members, roomName } = useDisplayChat(room, user)

    const closeChat = () => dispatch(chatActions.closeWindowChat(room._id))

    return (
        <Box p={1} display="flex" justifyContent="space-between" height="60px">
            <Box display="flex" alignItems="center" maxWidth="50%">
                <AvatarGroup total={members.length}>
                    {members.slice(0, 2).map((member) => (
                        <Avatar src={member.avatar} key={'avatar' + member.avatar} />
                    ))}
                </AvatarGroup>
                <Typography noWrap fontSize={16} fontWeight="bold" mx={1}>
                    {roomName}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <IconBox>
                    <FontAwesomeIcon icon={faVideo} />
                </IconBox>
                <IconBox>
                    <FontAwesomeIcon icon={faPhone} />
                </IconBox>
                <IconBox onClick={() => setExpand((pre) => !pre)}>
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
