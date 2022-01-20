import { LinearProgress, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { animated, useSpring } from '@react-spring/web'
import className from './loadingStyles.module.scss'
import SolarSystem from './2dSolarSystem'

function Loading() {
    return <SolarSystem />
}

export default Loading
