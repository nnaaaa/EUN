import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNoticeSocket } from 'api/socket/user'
import React, { useContext } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { acceptInvite } from 'states/slices/friendSlice'
import { css } from './noticeStyles'

const Notifications = () => {
    const style = css()
    const { socket } = useContext(SocketContext)
    const { loading, error, current } = useAppSelector(state => state.friend)
    const dispatch = useAppDispatch()
    const notices = useNoticeSocket(socket)

    if (loading)
        return <CircularProgress />

    return (
        <Box
            p={2}
            width="max-content"
            boxShadow={2}
            bgcolor="white"
            maxHeight="300px"
            overflow="auto"
        >
            {current.length ? (
                current?.map(user => (
                    <Box mb={1} display="flex" alignItems="center" width="280px" key={'notice'+user._id}>
                        <Box>
                            <Avatar src={user.avatar} />
                        </Box>
                        <Box mx={1} overflow="hidden" width="70%">
                            <Typography color="textPrimary" className={style.name}>
                                {user.username}
                            </Typography>
                            <Typography color="textSecondary" noWrap={true}>
                                send you an invition
                            </Typography>
                        </Box>
                        <Button
                            onClick={() => dispatch(acceptInvite(user._id))}
                            variant="outlined"
                            color="primary"
                            size="small"
                        >
                            accept
                        </Button>
                    </Box>
                ))
            ) : (<Typography>😓 Không có thông báo nào</Typography>)}
        </Box>
    )
}

export default Notifications
