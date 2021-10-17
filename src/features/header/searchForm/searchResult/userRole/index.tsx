import { faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Error from '@mui/icons-material/ErrorOutline'
import { Button, CircularProgress, IconButton, Typography } from '@mui/material'
import { friendAPI } from 'api/rest'
import { useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import {
    IFriendPublicInfo
} from 'states/slices/friendSlice'

interface IProps {
    user: IFriendPublicInfo
}

function UserRole({ user }: IProps) {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()

    const acceptInvite = async () => {
        try {
            setLoading(true)
            friendAPI.acceptInvite(user._id)
        }
        catch {
            setError('Can\'t accept this user')
        }
        finally {
            setLoading(false)
        }
    }

    const addFriend = async () => {
        try {
            setLoading(true)
            friendAPI.addFriend(user._id)
        }
        catch {
            setError('Can\'t add this user')
        }
        finally {
            setLoading(false)
        }
    }

    if (loading)
        return <CircularProgress size={20}></CircularProgress>

    if (error)
        return <Error color='error'/>
    
    if (user.role === 'accepted')
        return <FontAwesomeIcon icon={faCheckCircle} size="sm" color="green" />

    if (user.role === 'pending')
        return <Typography color="secondary" sx={{textTransform:'none'}}>Inviting</Typography>

    if (user.role === 'invited')
        return (
            <Button
                variant="outlined"
                onClick={acceptInvite}
                color="primary"
                size="small"
            >
                accept
            </Button>
        )

    return (
        <IconButton size="small" onClick={addFriend}>
            <FontAwesomeIcon icon={faPlus} size="xs" />
        </IconButton>
    )
}

export default UserRole
