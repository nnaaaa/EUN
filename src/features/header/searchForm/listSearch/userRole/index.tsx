import { faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, IconButton, Typography } from '@mui/material'
import { useAppDispatch } from 'states/hooks'
import {
    acceptInvite,
    addFriend,
    IFriendPublicInfo,
} from 'states/slices/friendSlice'

interface IProps {
    user: IFriendPublicInfo
}

function UserRole({ user }: IProps) {
    const dispatch = useAppDispatch()

    if (user.role === 'accepted')
        return <FontAwesomeIcon icon={faCheckCircle} size="sm" color="green" />

    if (user.role === 'pending')
        return <Typography color="secondary">Inviting</Typography>

    if (user.role === 'invited')
        return (
            <Button
                variant="outlined"
                onClick={() => dispatch(acceptInvite(user._id))}
                color="primary"
                size="small"
            >
                accept
            </Button>
        )

    return (
        <IconButton size="small" onClick={() => dispatch(addFriend(user._id))}>
            <FontAwesomeIcon icon={faPlus} size="xs" />
        </IconButton>
    )
}

export default UserRole
