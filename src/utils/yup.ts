import * as yup from 'yup'

export const loginValidate = yup.object().shape({
    account: yup.string().required('Bạn chưa nhập tài khoản').email('Email không hợp lệ'),
    password: yup.string().required('Bạn chưa nhập mật khẩu'),
})
