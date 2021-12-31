import { Stack, Typography } from '@mui/material'
import { IPublicInfo } from 'models/user'
import { useAppSelector } from 'states/hooks'

const NotFound = () => {
    const user = useAppSelector((state) => state.user.current)
    return (
        //   <Stack>
        <Typography>404 Not Found</Typography>
        // </Stack>
    )
}

export default NotFound
