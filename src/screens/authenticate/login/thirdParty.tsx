import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Button, Divider, Stack } from '@mui/material'
import { useAppSelector } from 'states/hooks'
import { useStyle } from './loginStyles'

function ThirdPartyLogin() {
    const style = useStyle()
    const isLoading = useAppSelector((state) => state.auth.loading)

    return (
        <Stack sx={{ maxWidth: '80%' }}>
            <Divider flexItem sx={{ my: 2 }} />
            <Button
                variant="outlined"
                className={style.signBtn}
                startIcon={
                    <FontAwesomeIcon icon={faFacebook} color="#2c88dd" />
                }
                disabled={isLoading}
            >
                Đăng nhập với Facebook
            </Button>

            <Button
                variant="outlined"
                className={style.signBtn}
                startIcon={<FontAwesomeIcon icon={faGoogle} color="#e2441d" />}
                disabled={isLoading}
            >
                Đăng nhập với Google
            </Button>
            <Button
                variant="outlined"
                className={style.lastSignBtn}
                startIcon={<GitHubIcon />}
                disabled={isLoading}
            >
                Đăng nhập với Github
            </Button>
            <Divider flexItem sx={{ my: 2 }} />
        </Stack>
    )
}

export default ThirdPartyLogin
