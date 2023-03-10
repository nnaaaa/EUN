import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import SolarSystem from './2dSolarSystem'

function Logo() {
    return (
        <Box style={{ cursor: 'pointer' }} component={Link} to="/">
            <SolarSystem />
        </Box>
    )
}

export default Logo
