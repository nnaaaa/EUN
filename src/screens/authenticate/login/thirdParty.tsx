import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Button, Divider, Stack } from '@mui/material'
import { useAppSelector } from 'states/hooks'
import { useStyle } from '../styles'
import { red } from '@mui/material/colors'
import { SERVER_EXPRESS } from 'config/keys'

function ThirdPartyLogin() {
    const style = useStyle()
    const isLoading = useAppSelector((state) => state.auth.loading)

    const facebookLogin = ()=>{
        // console.log(SERVER_EXPRESS)
        window.open(`${SERVER_EXPRESS}/auth/facebook`,"_self")
    }

    return (
        <Stack sx={{ maxWidth: '80%' }}>
            <Divider flexItem sx={{ my: 2 }} />
            <Button
                variant="outlined"
                className={style.signBtn}
                startIcon={<FontAwesomeIcon icon={faFacebook} color="#2c88dd" />}
                disabled={isLoading}
                color="info"
                sx={{ mb: 1 }}
                onClick={facebookLogin}
            >
                Đăng nhập với Facebook
            </Button>

            <Button
                variant="outlined"
                className={style.signBtn}
                startIcon={<FontAwesomeIcon icon={faGoogle} color={red[400]} />}
                disabled={isLoading}
                color="error"
                sx={{ mb: 1 }}
            >
                Đăng nhập với Google
            </Button>
            <Button
                variant="outlined"
                className={style.signBtn}
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

// interface IAuthLoginButton{
//     title: string
//     disabled: boolean
//     color: any
//     icon: IconDefinition
// }

// function AuthLoginButton({ title, disabled, color, icon }: IAuthLoginButton) {
//     const style = useStyle()

//     return (
//         <Button
//             variant="outlined"
//             className={style.signBtn}
//             startIcon={<FontAwesomeIcon icon={icon}/>}
//             disabled={disabled}
//             color={color}
//             sx={{ mb: 1 }}
//         >
//             {title}
//         </Button>
//     )
// }
