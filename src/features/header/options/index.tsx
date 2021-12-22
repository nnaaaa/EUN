import { Avatar, Button, Divider, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { authActions } from 'states/slices/authSlice'

const Options = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    return (
        <Stack
            p={1}
            width="max-content"
            boxShadow={2}
            bgcolor="white"
            alignItems="center"
        >
            <Button sx={{ p: 1.5, textTransform: 'none' }} component={Link} to="/profile">
                <Avatar
                    src={user?.avatar}
                    sx={{ width: 70, height: 70, marginRight: 2 }}
                />
                <Stack alignItems="flex-start">
                    <Typography sx={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>
                        {user?.username}
                    </Typography>
                    <Typography variant="subtitle1" color="#a09d9d">
                        See your profile
                    </Typography>
                </Stack>
            </Button>
            <Divider sx={{ height: 1, my: 2 }} flexItem />
            <Button
                onClick={() => dispatch(authActions.logoutAsync())}
                variant="outlined"
                style={{ marginLeft: 'auto' }}
                color="primary"
                size="small"
            >
                Log out
            </Button>
        </Stack>
    )
}

export default Options
