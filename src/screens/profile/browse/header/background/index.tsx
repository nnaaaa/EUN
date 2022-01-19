import { Avatar, Box, IconButton } from '@mui/material'
import Logo from 'components/logo'
import { Link } from 'react-router-dom'
import { useStyle } from './styles'

const Background = ({ avatar }: { avatar: string | undefined }) => {
    const style = useStyle()
    return (
        <Box className={style.coverPhoto}>
            <Box className={style.avatar}>
                <Avatar src={avatar} className={style.avatarInside} />
            </Box>
            <IconButton className={style.logo} component={Link} to="/">
                <Logo/>
            </IconButton>
        </Box>
    )
}

export default Background
