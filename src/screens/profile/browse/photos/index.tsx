import { Box, Button, Grid, Typography } from '@mui/material'
import { useStyle } from './styles'
import Tilty from 'react-parallax-tilt'

interface IPhotoProps {
    setIndex: (i: number) => void
}

export default function Photos({ setIndex }: IPhotoProps) {
    const style = useStyle()
    // const urls = useSelector((state) => state.listPost.map((post) => post.images).flat(1))

    return (
        <Box p={2} mb={2} borderRadius={1} boxShadow={1} bgcolor="background.paper">
            <Box mb={2} display="flex" justifyContent="space-between">
                <Typography className={style.title}>Photos</Typography>
                <Button variant="text" color="primary" onClick={() => setIndex(1)}>
                    <Typography className={style.link}>See All Photos</Typography>
                </Button>
            </Box>
            <Grid container spacing={1}>
                {/* {urls?.slice(0, 9)?.map((url, index) => (
          <Grid item xs={4} container justify="center" key={index}>
            <Tilty scale={1.2} glare>
              <img src={url} className={style.photo} alt={index} />
            </Tilty>
          </Grid>
        ))} */}
            </Grid>
        </Box>
    )
}
