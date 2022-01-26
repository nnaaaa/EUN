import { Grid } from '@mui/material'
import Status from 'features/status'
import ListPost from 'features/listPost'
import { useAppSelector } from 'states/hooks'

const Newsfeed = () => {
    const user = useAppSelector((state) => state.user.current)
    if (!user) return <></>

    return (
        <Grid item>
            <Status />
            <ListPost mode="publicAndFriend" user={user} />
        </Grid>
    )
}

export default Newsfeed
