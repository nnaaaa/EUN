import { Stack } from '@mui/material'
import Earth, { Orbit as EarthOrbit } from './earth'
import Sun, { Orbit as SunOrbit } from './sun'
import Moon from './moon'
import image from './background.jpg'

function SolarSystem() {
    return (
        <Stack
            width="100vw"
            height="100vh"
            justifyContent="center"
            alignItems="center"
            style={{
                background: `url(${image})`,
                backgroundSize: 'cover',
            }}
        >
            {/* <Typography fontWeight="bold" color="primary">
                Loading
            </Typography>
            <Box width="20%">
                <LinearProgress />
            </Box> */}
            {/* <div className={className.solar}>
                <div className={className.sun} />
                <div className={className.plannet}>
                    <div className={className.earth}/>
                    <div className={className.moon}/>
                </div>
            </div> */}
            <SunOrbit>
                <Sun />
                <EarthOrbit>
                    <Earth />
                    <Moon />
                </EarthOrbit>
            </SunOrbit>
        </Stack>
    )
}

export default SolarSystem
