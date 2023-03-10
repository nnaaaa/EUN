import { Avatar, Button, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import { Color } from 'styles/global'
import Images from './assets'
import { useStyle } from './gutterStyles'

interface CustomButtonProps {
    textStyle: string
    buttonStyle: string
    iconSrc: string
    title: string
}

const CustomButton: FC<CustomButtonProps> = ({textStyle, buttonStyle, iconSrc, title}) => {
    return (
        <Button startIcon={<Avatar src={iconSrc} />} className={buttonStyle}>
            <Typography
                className={textStyle}
                sx={{ color: { xs: 'primary' } }}
            >
                {title}
            </Typography>
        </Button>
    )
}

export default function Gutter() {
    const style = useStyle()
    const user = useAppSelector((state) => state.user.current)

    return (
        <Stack bgcolor={Color.CARD_BACKGROUND} borderRadius={2}>
            <Button
                component={Link}
                to="/profile"
                startIcon={<Avatar src={user?.avatar} />}
                className={style.button}
                variant="contained"
            >
                <Typography
                    className={style.text}
                    sx={{ color: { xs: 'primary' } }}
                    noWrap
                >
                    {user?.username}
                </Typography>
            </Button>
            <CustomButton title="Friends" textStyle={style.text} buttonStyle={style.button} iconSrc={Images.group} />
            <CustomButton title="Save" textStyle={style.text} buttonStyle={style.button} iconSrc={Images.save} />
            <CustomButton title="Event" textStyle={style.text} buttonStyle={style.button} iconSrc={Images.event} />
            <CustomButton title="Memories" textStyle={style.text} buttonStyle={style.button} iconSrc={Images.clock} />
        </Stack>
    )
}
