import { Stack, Typography } from '@mui/material'
import { IPublicInfo } from 'models/user'
import { FriendProfile, OwnerProfile } from 'screens/profile'
import { useAppSelector } from 'states/hooks'

const NotFound = () => {
    const user = useAppSelector((state) => state.user.current)
    return (
        //   <Stack>
        <OwnerProfile user={user as IPublicInfo} />
        // </Stack>
    )
}

export default NotFound
