import { LoadingButton } from '@mui/lab'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { loginAsync } from 'states/slices/authSlice'
import { getProfile } from 'states/slices/userSlice'
import { loginValidate } from 'utils/yup'
import { useStyle } from './loginStyles'
import ThirdPartyLogin from './thirdParty'

interface Props {
    switchForm: () => void
}

export default function Login({ switchForm }: Props) {
    const style = useStyle()
    const isLoading = useAppSelector((state) => state.auth.loading)
    const dispatch = useAppDispatch()

    const { errors, values, touched, handleSubmit, handleChange } = useFormik({
        initialValues: {
            account: '',
            password: '',
        },
        validationSchema: loginValidate,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await dispatch(loginAsync(values))
                await dispatch(getProfile())
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
                style={{ marginBottom: 20 }}
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
                style={{ marginBottom: 20 }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                value={values.password}
            />
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
