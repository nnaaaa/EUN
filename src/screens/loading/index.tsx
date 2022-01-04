import { LinearProgress, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'

function Loading() {
    return (
        <Stack width="100vw" height="100vh" justifyContent="center" alignItems="center">
            <Typography fontWeight="bold" color="primary">
                Loading
            </Typography>
            <Box width="20%">
                <LinearProgress />
            </Box>
        </Stack>
    )
}

export default Loading
