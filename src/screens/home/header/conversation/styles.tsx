import { Box } from '@mui/material'
import SolarSystem2d from 'components/logo/2dSolarSystem'

export const ConversationLoading = () => {
    return (
        <Box
            p={1}
            boxShadow={2}
            bgcolor="white"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <SolarSystem2d />
        </Box>
    )
}
