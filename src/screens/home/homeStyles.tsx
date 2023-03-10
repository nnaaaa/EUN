import { Grid, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    wrapper: {
        minHeight: '100vh',
    },
})

export const HomeLazyLoading = () => {
    const style = useStyle()
    const SmallRect = () => <Skeleton height={50} variant="rectangular" sx={{ mb: 2 }} />
    const BigRect = () => <Skeleton height={280} variant="rectangular" sx={{ mb: 2 }} />
    return (
        <Grid container className={style.wrapper} sx={{ p: 0, pt: 2 }}>
            <Grid
                item
                md={3}
                sx={{
                    display: {
                        xs: 'none',
                        lg: 'initial',
                    },
                    px: 2,
                    pb: 2,
                }}
            >
                <BigRect />
                <BigRect />
                <SmallRect />
                <SmallRect />
            </Grid>
            <Grid
                item
                xs={12}
                md={8}
                lg={6}
                sx={{
                    pl: { xs: 2, lg: 0 },
                    pr: {
                        xs: 2,
                        md: 0,
                    },
                    pb: 2,
                }}
            >
                <Skeleton height={110} variant="rectangular" sx={{ mb: 2 }} />
                <BigRect />
                <BigRect />
            </Grid>
            <Grid
                item
                md={4}
                lg={3}
                sx={{
                    display: {
                        xs: 'none',
                        md: 'initial',
                    },
                    px: 2,
                    pb: 2,
                }}
            >
                <BigRect />
                <SmallRect />
                <SmallRect />
                <BigRect />
            </Grid>
        </Grid>
    )
}
