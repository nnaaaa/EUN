import { Button, Grid, Typography, Box, Avatar } from '@mui/material'
import { useStyle } from './styles'
import Tilty from 'react-parallax-tilt'
import { IPublicInfo } from 'models/user'

interface IFriendsProps {
    user: IPublicInfo
    setIndex: (i: number) => void
}

export default function Friends({ setIndex, user }: IFriendsProps) {
    const style = useStyle()

    return (
        <Box
            p={2}
            borderRadius={1}
            boxShadow={1}
            bgcolor="white"
            className={style.wrapper}
        >
            <Box mb={2} display="flex" justifyContent="space-between">
                <Typography className={style.title}>Friends</Typography>
                <Button variant="text" color="primary" onClick={() => setIndex(2)}>
                    <Typography className={style.link}>See All Friends</Typography>
                </Button>
            </Box>
            <Grid container spacing={1}>
                {user.friends.accepted.slice(0, 9)?.map((user, index) => (
                    <Grid item xs={4} key={index}>
                        <Box className={style.wrappedImage}>
                            <Box className={style.insideWrappedImage}>
                                <Avatar
                                    src={user.avatar}
                                    className={style.avatar}
                                    variant="rounded"
                                    alt={user.username + index}
                                />
                            </Box>
                        </Box>
                        <Typography className={style.name}>{user.username}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
