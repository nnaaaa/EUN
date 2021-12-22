import { LoadingButton } from '@mui/lab'
import { Button, TextField, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { isEmptyObj } from 'algorithms/object'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { authActions } from 'states/slices/authSlice'
import { userActions } from 'states/slices/userSlice'
import { loginValidate } from 'utils/yup'
import { useStyle } from '../styles'
import ThirdPartyLogin from './thirdParty'

interface Props {
    switchForm: () => void
}

export default function Login({ switchForm }: Props) {
    const style = useStyle()
    const { loading: isLoading, error: authError } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const { errors, values, touched, handleSubmit, handleChange } = useFormik({
        initialValues: {
            account: '',
            password: '',
        },
        validationSchema: loginValidate,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await dispatch(authActions.loginAsync(values))
                unwrapResult(await dispatch(userActions.getProfile()))
            } catch {
                setFieldError('account', 'Tài khoản chưa đăng ký')
            }
        },
    })

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <TextField
                name="account"
                label="Tài khoản"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                // error={touched.account && Boolean(errors.account)}
                // helperText={touched.account && errors.account}
                onChange={handleChange}
                value={values.account}
            />
            <TextField
                name="password"
                label="Mật khẩu"
                variant="outlined"
                fullWidth
                type="password"
                sx={{ mb: 2 }}
                // error={touched.password && Boolean(errors.password)}
                // helperText={touched.password && errors.password}
                onChange={handleChange}
                value={values.password}
            />

            {authError && (
                <Typography color="error" gutterBottom>
                    Sai tài khoản hoặc mật khẩu
                </Typography>
            )}

            <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                loading={isLoading}
            >
                Đăng nhập
            </LoadingButton>

            <ThirdPartyLogin />

            <Button onClick={switchForm} variant="contained">
                Tạo tài khoản mới
            </Button>
        </form>
    )
}
