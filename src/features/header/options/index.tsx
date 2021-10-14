import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAppSelector } from 'states/hooks'


const Options = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useAppSelector((state) => state.user.current)
    // const logOut = async () => {
    //     await auth.signOut()
    //     dispatch(Actions.setUserInfo({}))
    //     await db.collection('users').doc(id).update({ isOnline: false })
    //     dispatch(Actions.setLogout())
    //     history.push('/login')
    // }

    return (
        <Box
            p={2}
            width="max-content"
            borderRadius={6}
            boxShadow={2}
            bgcolor="white"
            display="flex"
            alignItems="center"
            flexDirection="column"
        >
            <Avatar src={user?.avatar} style={{ width: 100, height: 100 }} />
            <Typography style={{ fontWeight: 'bold' }} gutterBottom>
                {user?.username}
            </Typography>
            <Divider style={{ height: 1, marginBottom: 10 }} flexItem />
            <Button
                // onClick={logOut}
                variant="outlined"
                style={{ marginLeft: 'auto' }}
                color="primary"
                size="small"
            >
                <Link to="/login" style={{ color: 'inherit' }}>
                    Log out
                </Link>
            </Button>
        </Box>
    )
}

export default Options
