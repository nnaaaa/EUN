import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, IconButton } from '@mui/material'
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
                <FontAwesomeIcon icon={faFacebook} />
            </IconButton>
        </Box>
    )
}

export default Background
