import { Box, Grid, Typography, Avatar } from '@mui/material'
import React from 'react'
import { useStyle } from './styles'
import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { IPublicInfo } from 'models/user'

interface IListFriendProps {
    setIndex: (i: number) => void
    user: IPublicInfo
}

export default function ListFriend({ setIndex, user }: IListFriendProps) {
    const style = useStyle()
    const [friendList, setFriendList] = useState([])

    return (
        <Box p={2} borderRadius={1} boxShadow={1} bgcolor="white">
            <Box mb={2} display="flex" justifyContent="space-between">
                <Typography className={style.title}>Friends</Typography>
            </Box>
            <Grid container spacing={1}>
                {user.friends.accepted?.slice(0, 9)?.map((u, index) => (
                    <Grid
                        item
                        xs={6}
                        container
                        alignItems="center"
                        key={index}
                        justifyContent="flex-start"
                        className={style.frame}

                    >
                        <Avatar
                            variant="square"
                            src={u.avatar}
                            className={style.avatar}
                        />
                        {/* <Link to={`/friend/${user.uid}`} className={style.name}> */}
                        <Typography>{u.username}</Typography>
                        {/* </Link> */}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
