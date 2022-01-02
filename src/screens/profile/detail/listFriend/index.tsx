import { Box, Grid, Typography, Avatar, Paper, Stack } from '@mui/material'
import React from 'react'
import { useStyle } from './styles'
import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { IPublicInfo } from 'models/user'
import AutoAvatar from 'components/autoAvatar'

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
                    >
                        <Grid
                            item
                            container
                            boxShadow={1}
                            borderRadius={1}
                            p={2}
                            alignItems="center"
                        >
                            <Grid xs={3} item>
                                <AutoAvatar src={u.avatar} />
                            </Grid>
                            <Grid xs={9} item>
                                <Typography
                                    component={Link}
                                    to="/"
                                    className={style.name}
                                >
                                    {u.username}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
