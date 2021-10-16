import { LoadingButton } from '@mui/lab'
import { Button, Divider, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { actions } from 'states/slices/authSlice'
import * as yup from 'yup'
import { useStyle } from '../styles'

const validationSchema = yup.object().shape({
    firstName: yup.string().required('Bạn chưa nhập họ').trim(),
    fullName: yup.string().required('Bạn chưa nhập tên').trim(),
    account: yup
        .string()
        .required('Bạn chưa nhập tài khoản')
        .email('Email không hợp lệ'),
    password: yup
        .string()
        .required('Bạn chưa nhập mật khẩu')
        .min(8, 'Mật khẩu quá ngắn')
        .max(16, 'Mật khẩu quá dài')
        .matches(/^[a-zA-Z0-9]+$/, 'Mật khẩu chỉ chứa số và chữ cái'),
    confirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp')
        .required('Bạn chưa nhập lại mật khẩu'),
})

interface Props {
    switchForm: () => void
}

export default function Register({ switchForm }: Props) {
    const style = useStyle()
    const isLoading = useAppSelector((state) => state.auth.loading)
    const dispatch = useAppDispatch()

    const { errors, touched, values, handleSubmit, handleChange } = useFormik({
        initialValues: {
            firstName: '',
            fullName: '',
            account: '',
            password: '',
            confirm: '',
        },
        validationSchema,
        onSubmit: async (values, { setFieldError }) => {
            const username = values.firstName + ' ' + values.fullName
            await dispatch(
                actions.registerAsync({
                    account: values.account,
                    password: values.password,
                    username,
                })
            )
        },
    })

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField
                        name="firstName"
                        fullWidth
                        label="Họ"
                        sx={{ mb: 1 }}
                        variant="outlined"
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        onChange={handleChange}
                        value={values.firstName}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        name="fullName"
                        fullWidth
                        label="Tên"
                        sx={{ mb: 2 }}
                        variant="outlined"
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                        onChange={handleChange}
                        value={values.fullName}
                    />
                </Grid>
            </Grid>
            <TextField
                name="account"
                fullWidth
                label="Tài khoản"
                sx={{ mb: 2 }}
                variant="outlined"
                placeholder="example@gmail.com"
                error={touched.account && Boolean(errors.account)}
                helperText={touched.account && errors.account}
                onChange={handleChange}
                value={values.account}
            />
            <TextField
                name="password"
                fullWidth
                label="Mật khẩu"
                sx={{ mb: 2 }}
                variant="outlined"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                value={values.password}
            />
            <TextField
                name="confirm"
                fullWidth
                label="Nhập lại mật khẩu"
                sx={{ mb: 2 }}
                variant="outlined"
                type="password"
                error={touched.confirm && Boolean(errors.confirm)}
                helperText={touched.confirm && errors.confirm}
                onChange={handleChange}
                value={values.confirm}
            />
            <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                color="primary"
            >
                Đăng ký
            </LoadingButton>
            <Divider flexItem sx={{ my: 2, width: '70%', mx: 'auto' }} />
            <Button onClick={switchForm} variant="contained">
                Đã có tài khoản
            </Button>
        </form>
    )
}
