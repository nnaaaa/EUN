import { Box, Chip, Typography } from '@mui/material'
import { useStyle } from './styles'
import Tilty from 'react-parallax-tilt'
import { IPublicInfo } from 'models/user'

interface IIntroProps {
    user: IPublicInfo
}

export default function Intro({ user }: IIntroProps) {
    const style = useStyle()
    return (
        <Box mb={2} p={2} borderRadius={1} boxShadow={1} bgcolor="white">
            <Box mb={2} display="flex" justifyContent="space-between">
                <Typography className={style.title}>Intro</Typography>
            </Box>
            {/* <Box display="flex">
        {info?.hobbies?.map((item, index) => (
          <Tilty scale={1.2} key={item + index}>
            <Chip
              color="default"
              variant="outlined"
              className={style.hobbies}
              label={item}
              key={index}
            />
          </Tilty>
        ))}
      </Box> */}
        </Box>
    )
}
