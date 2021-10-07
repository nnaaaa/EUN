import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Button, TextField } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { loginValidate } from 'utils/yup'
import { loginAsync } from './authSlice'
import { Divider, useStyle } from './styles'



interface Props{
  switchForm: () => void
}



export default function Login({ switchForm }: Props) {
  const style = useStyle()
  const isLoading = useAppSelector(state => state.auth.loading)
  const dispatch = useAppDispatch()

  const { errors, values, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      account: '',
      password: '',
    },
    validationSchema: loginValidate,
    onSubmit: async (values, { setFieldError }) => {
      const actionResult = await dispatch(loginAsync(values))
      const token = unwrapResult(actionResult)
      // dispatch(Actions.setLoading(true))
      // try {
      //   const {user} = await auth.signInWithEmailAndPassword(
      //     values.account,
      //     values.password
      //   )
      //   const userInfo = await getDocument('users', {
      //     field: 'id',
      //     operator: '==',
      //     value: user.uid,
      //   })
      //   if (!user) return
      //   dispatch(Actions.setUserInfo(userInfo))
      //   dispatch(Actions.setLogin())
      // } catch (err) {
      //   if (err.code.search('user') >= 0)
      //     setFieldError('account', 'Tài khoản chưa đăng ký')
      //   if (err.code.search('password') >= 0) setFieldError('password', 'Sai mật khẩu')
      // } finally {
      //   dispatch(Actions.setLoading(false))
      // }
    }
  })


  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <TextField
        name="account"
        label="Tài khoản"
        variant="outlined"
        fullWidth
        style={{marginBottom: 20}}
        error={touched.account && Boolean(errors.account)}
        helperText={touched.account && errors.account}
        onChange={handleChange}
        value={values.account}
      />
      <TextField
        name="password"
        label="Mật khẩu"
        variant="outlined"
        fullWidth
        type="password"
        style={{marginBottom: 20}}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        onChange={handleChange}
        value={values.password}
      />
      <Button color="primary" variant="contained" type="submit" disabled={isLoading}>
        Đăng nhập
      </Button>
      <Divider />
      <Button
        variant="outlined"
        className={style.signBtn}
        startIcon={<FontAwesomeIcon icon={faFacebook} color="#2c88dd" />}
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
      <Divider />
      <Button onClick={switchForm} variant="contained">
        Tạo tài khoản mới
      </Button>
    </form>
  )
}
