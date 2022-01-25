import { Box, Button, Grid, Typography } from '@mui/material'
import AutoAvatar from 'components/autoAvatar'
import { IPublicInfo } from 'models/user'
import { Link } from 'react-router-dom'
import { useStyle } from './styles'

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
                    <Grid
                        item
                        xs={4}
                        key={index}
                        component={Link}
                        to={`/user/${user._id}`}
                    >
                        <AutoAvatar src={user.avatar} />
                        <Typography className={style.name} noWrap>
                            {user.username}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
