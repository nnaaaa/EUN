import { Box, Button, Chip, Typography } from '@mui/material'
import { IPublicInfo } from 'models/user'
import { hobbieOptions } from '../header/editProfile/editProfileHook'
import { useStyle } from './styles'

interface IIntroProps {
    user: IPublicInfo
}

export default function Intro({ user }: IIntroProps) {
    const style = useStyle()

    const showMoreAboutHobbie = () => {}

    return (
        <Box mb={2} p={2} borderRadius={1} boxShadow={1} bgcolor="white">
            <Box mb={2} display="flex" justifyContent="space-between">
                <Typography className={style.title}>Intro</Typography>
            </Box>
            <Box display="flex" flexWrap='wrap'>
                {user.hobbies?.map((item, index) => (
                    <Chip
                        color="default"
                        variant="outlined"
                        className={style.hobbies}
                        onClick={showMoreAboutHobbie}
                        label={
                            hobbieOptions.find((option) => option.value == item)?.label
                        }
                        key={index}
                    />
                ))}
            </Box>
            <Button className={style.education} variant="contained" color="inherit">
                <Typography noWrap>Education: {user.education}</Typography>
            </Button>
        </Box>
    )
}
