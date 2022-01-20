import { Avatar, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import Images from './assets'
import { useStyle } from './gutterStyles'

export default function Gutter() {
    const style = useStyle()
    const user = useAppSelector((state) => state.user.current)

    return (
        <Stack>
            <Button
                component={Link}
                to="/profile"
                startIcon={<Avatar src={user?.avatar} />}
                className={style.button}
            >
                <Typography className={style.text}>{user?.username}</Typography>
            </Button>
            <Button startIcon={<Avatar src={Images.group} />} className={style.button}>
                <Typography className={style.text}>Friends</Typography>
            </Button>
            <Button startIcon={<Avatar src={Images.save} />} className={style.button}>
                <Typography className={style.text}>Save</Typography>
            </Button>
            <Button startIcon={<Avatar src={Images.event} />} className={style.button}>
                <Typography className={style.text}>Event</Typography>
            </Button>
            <Button startIcon={<Avatar src={Images.clock} />} className={style.button}>
                <Typography className={style.text}>Memories</Typography>
            </Button>
        </Stack>
    )
}
