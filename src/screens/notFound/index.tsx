import { Stack, Typography } from '@mui/material'
import { IPublicInfo } from 'models/user'
import { useAppSelector } from 'states/hooks'

const NotFound = () => {
    const user = useAppSelector((state) => state.user.current)
    return (
        <Stack width="100vw" height="100vh" justifyContent="center" alignItems="center">
            <Typography fontWeight="bold" variant="h3">
                404 Not Found
            </Typography>
        </Stack>
    )
}

export default NotFound
