import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'states/hooks'
// import { friendActions } from 'states/slices/friendSlice'
import { css } from './noticeStyles'

const Notifications = () => {
    const style = css()
    // const { loading, error, current } = useAppSelector((state) => state.friend)
    const dispatch = useAppDispatch()

    // if (loading)
    //     return (
    //         <Box display="flex" alignItems="center" width="280px">
    //             <CircularProgress />
    //         </Box>
    //     )

    return (
        <Box p={2} boxShadow={2} bgcolor="white" maxHeight="300px" overflow="auto">
            {/* {current.length ? (
                current?.map((user) => (
                    <Box
                        mb={1}
                        display="flex"
                        alignItems="center"
                        width="280px"
                        key={'notice' + user._id}
                    >
                        <Box>
                            <Avatar src={user.avatar} />
                        </Box>
                        <Box mx={1} overflow="hidden" width="70%">
                            <Typography
                                color="textPrimary"
                                className={style.name}
                            >
                                {user.username}
                            </Typography>
                            <Typography color="textSecondary" noWrap={true}>
                                send you an invition
                            </Typography>
                        </Box>
                        <Button
                            onClick={() => dispatch(friendActions.acceptInvite(user._id))}
                            variant="outlined"
                            color="primary"
                            size="small"
                        >
                            accept
                        </Button>
                    </Box>
                ))
            ) : (
                <Typography>😓 Không có thông báo nào</Typography>
            )} */}
            <Typography>😓 Không có thông báo nào</Typography>
        </Box>
    )
}

export default Notifications
