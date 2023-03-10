import { Stack } from '@mui/material'
import className from './styles.module.scss'

const SolarSystem2d = () => {
    return (
        <Stack
            width="50px"
            height="50px"
            justifyContent="center"
            alignItems="center"
            bgcolor="#B88DEA"
            borderRadius="50%"
        >
            <div className={className.solar}>
                <div className={className.sun} />
                <div className={className.plannet}>
                    <div className={className.earth} />
                    <div className={className.moon} />
                </div>
            </div>
        </Stack>
    )
}

export default SolarSystem2d
