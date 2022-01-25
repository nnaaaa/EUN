import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import SolarSystem2d from 'components/logo/2dSolarSystem'

export const useStyle = makeStyles((theme) => ({
    wrapper: {
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        margin: 0,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
        userSelect: 'none',
    },
}))

export const ConversationLoading = () => {
    return (
        <Box
            p={1}
            boxShadow={2}
            bgcolor="white"
            width="300px"
            height="200px"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <SolarSystem2d />
        </Box>
    )
}
