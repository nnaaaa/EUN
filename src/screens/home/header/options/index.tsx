import { Avatar, Button, Divider, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { authActions } from 'screens/authenticate/authSlice'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { Color } from 'styles/global'

const Options = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    return (
        <Stack p={1} width="300px" boxShadow={2} bgcolor="background.paper" alignItems="center">
            <Button
                sx={{
                    p: 1,
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
                component={Link}
                to="/profile"
                fullWidth
            >
                <Avatar
                    src={user?.avatar}
                    sx={{ width: 70, height: 70, marginRight: 2 }}
                />
                <Stack alignItems="flex-start" maxWidth="70%">
                    <Typography
                        sx={{ fontWeight: 'bold', fontSize: 20, color: Color.TEXT_PRIMARY_COLOR }}
                        noWrap
                        width="100%"
                    >
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
