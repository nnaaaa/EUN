import { Grid } from '@mui/material'
import Status from 'features/status'
import ListPost from 'features/blog/listPost'

const Newsfeed = () => {
    return (
        <Grid item>
            <Status />
            <ListPost type="all" />
        </Grid>
    )
}

export default Newsfeed
