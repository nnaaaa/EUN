import { Grid } from '@mui/material'
import Status from 'features/status'
import ListPost from 'features/listPost'

const Newsfeed = () => {
    return (
        <Grid item>
            <Status />
            <ListPost />
        </Grid>
    )
}

export default Newsfeed
