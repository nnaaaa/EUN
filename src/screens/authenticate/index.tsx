import { Typography } from '@mui/material'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import Login from './login'
import { Wrapper } from './styles'



export default function Form() {
  const [isLogin, setIsLogin] = useState(true)
  const switchForm = () => setIsLogin(!isLogin)
  // const status = useAppSelector(state=>state.)

  // if (status) return <Redirect to="/home" />

  return (
    <Wrapper>
      <Typography variant="h2" component="h1" color="primary" gutterBottom>
        Facebook
      </Typography>
      {isLogin && <Login switchForm={switchForm} />}
      {/* {!isLogin && <Register onClick={switchForm} login={setIsLogin} />} */}
    </Wrapper>
  )
}
