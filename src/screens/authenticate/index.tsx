import { Typography } from '@mui/material'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import useMeasure from 'react-use-measure'
import { useAppSelector } from 'states/hooks'
import Login from './login'
import Register from './register'
import { Wrapper } from './styles'

export default function Form() {
    const [isLogin, setIsLogin] = useState(true)
    const switchForm = () => setIsLogin(!isLogin)
    const status = useAppSelector((state) => state.auth.state)
    const [ref, { width }] = useMeasure()

    if (status === 'logged') return <Redirect to="/" />

    return (
        <Wrapper ref={ref}>
            <Typography variant="h2" component="h1" color="primary" gutterBottom>
                {width < 700 ? 'EUN' : 'Emulate Universe Network'}
            </Typography>
            {isLogin && <Login switchForm={switchForm} />}
            {!isLogin && <Register switchForm={switchForm} />}
        </Wrapper>
    )
}
