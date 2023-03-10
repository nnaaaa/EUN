import { Box, Grid, Typography } from '@mui/material'
import { useStyle } from './styles'
import Tilty from 'react-parallax-tilt'
import { IPublicInfo } from 'models/user'

interface IListPhotoProps {
    user: IPublicInfo
}

export default function ListPhoto({ user }: IListPhotoProps) {
    const style = useStyle()
    // const urls = useSelector((state) => state.listPost.map((post) => post.images).flat(1))

    return (
        <Box p={2} mb={2} borderRadius={1} boxShadow={1} bgcolor="background.paper">
            <Box mb={2} display="flex" justifyContent="space-between">
                <Typography className={style.title}>Photos</Typography>
            </Box>
            <Grid container spacing={1}>
                {/* {urls?.map((url, index) => (
          <Grid item xs={4} container justify="center" key={index}>
            <Tilty scale={1.1}>
              <img src={url} className={style.photo} alt={index} />
            </Tilty>
          </Grid>
        ))} */}
            </Grid>
        </Box>
    )
}
