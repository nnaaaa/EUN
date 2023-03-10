import { Box, Grid, Skeleton } from '@mui/material'
import SolarSystem2d from 'components/logo/2dSolarSystem'

export const NotificationLoading = () => {
    return (
        <Box
            p={1}
            boxShadow={2}
            bgcolor="background.paper"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <SolarSystem2d />
        </Box>
    )
}

export const LazyLoading = () => (
    <Box p={1}>
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <Skeleton variant="circular" height="40px" width="40px" />
            </Grid>
            <Grid item xs={10}>
                <Skeleton variant="rectangular" height="60px" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height="20px" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height="10px" />
            </Grid>
        </Grid>
    </Box>
)
