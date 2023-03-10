import { Box, Grid, Skeleton } from '@mui/material'
import { Color } from 'styles/global'

export const BoxStyled = ({ children }: { children: React.ReactElement }) => (
    <Box
        py={2}
        sx={{
            px: {
                xs: 10,
                lg: 30,
            },
            height:'100%'
        }}
        bgcolor={Color.FOCUS_CARD_BACKGROUND}
    >
        {children}
    </Box>
)

export const ProfileLazyloading = () => {
    const SmallRect = () => <Skeleton height={140} variant="rectangular" sx={{ mt: 2 }} />
    const MediumRect = () => (
        <Skeleton height={150} variant="rectangular" sx={{ mt: 2 }} />
    )
    const BigRect = () => <Skeleton height={300} variant="rectangular" sx={{ mt: 2 }} />

    return (
        <Box width="100%">
            <Box width="100%" position="relative">
                <Skeleton height={400} variant="rectangular" />
                <Box
                    style={{
                        position: 'absolute',
                        bottom: -20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: 5,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                    }}
                >
                    <Skeleton height={150} width={150} variant="circular" />
                </Box>
            </Box>
            <Skeleton
                height={50}
                width={200}
                variant="text"
                sx={{
                    mt: 2,
                    mx: 'auto',
                }}
            />
            <Skeleton height={50} variant="rectangular" sx={{ mt: 3 }} />
            <Box
                py={2}
                sx={{
                    px: {
                        xs: 10,
                        lg: 30,
                    },
                }}
            >
                <Grid container spacing={2}>
                    <Grid item md={5}>
                        <SmallRect />
                        <SmallRect />
                        <SmallRect />
                    </Grid>
                    <Grid item md={7}>
                        <MediumRect />
                        <BigRect />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
