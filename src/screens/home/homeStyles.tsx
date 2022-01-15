import { Grid, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    wrapper: {
        paddingTop: 80,
    },
    pLeft: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
    },
    pRight: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    pCenter: {
        paddingBottom: 20,
        height: 'auto',
    },
    marginBottom: {
        marginBottom: 10,
    },
})

export const HomeLazyLoading = () => {
    const style = useStyle()
    const SmallRect = () => (
        <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    )
    const BigRect = () => (
        <Skeleton height={280} variant="rectangular" className={style.marginBottom} />
    )
    return (
        <Grid container mt={2}>
            <Grid
                item
                md={3}
                className={style.pLeft}
                sx={{
                    display: {
                        xs: 'none',
                        lg: 'initial',
                    },
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
                sx={{ pl: { xs: 2, lg: 0 } }}
                className={style.pCenter}
            >
                <Skeleton
                    height={110}
                    variant="rectangular"
                    className={style.marginBottom}
                />
                <BigRect />
                <BigRect />
            </Grid>
            <Grid
                item
                md={4}
                lg={3}
                className={style.pRight}
                sx={{
                    display: {
                        xs: 'none',
                        md: 'initial',
                    },
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
