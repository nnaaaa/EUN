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
    return (
        <Grid container className={style.wrapper}>
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
                <Skeleton height={300} variant="rectangular" />
            </Grid>
            <Grid item md={6} xs={12} className={style.pCenter}>
                <Skeleton
                    height={150}
                    variant="rectangular"
                    className={style.marginBottom}
                />
                <Skeleton
                    height={300}
                    variant="rectangular"
                    className={style.marginBottom}
                />
                <Skeleton
                    height={300}
                    variant="rectangular"
                    className={style.marginBottom}
                />
            </Grid>
            <Grid
                item
                md={3}
                className={style.pRight}
                sx={{
                    display: {
                        xs: 'none',
                        md: 'initial',
                    },
                }}
            >
                <Skeleton
                    height={50}
                    variant="rectangular"
                    className={style.marginBottom}
                />
                <Skeleton
                    height={50}
                    variant="rectangular"
                    className={style.marginBottom}
                />
                <Skeleton
                    height={50}
                    variant="rectangular"
                    className={style.marginBottom}
                />
                <Skeleton
                    height={50}
                    variant="rectangular"
                    className={style.marginBottom}
                />
                <Skeleton
                    height={50}
                    variant="rectangular"
                    className={style.marginBottom}
                />
            </Grid>
        </Grid>
    )
}
