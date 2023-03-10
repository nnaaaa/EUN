import * as yup from 'yup'

export const loginValidate = yup.object().shape({
    account: yup.string().required('Bạn chưa nhập tài khoản').email('Email không hợp lệ'),
    password: yup.string().required('Bạn chưa nhập mật khẩu'),
})

export const registerValidate = yup.object().shape({
    firstName: yup.string().required('Bạn chưa nhập họ').trim(),
    fullName: yup.string().required('Bạn chưa nhập tên').trim(),
    account: yup.string().required('Bạn chưa nhập tài khoản').email('Email không hợp lệ'),
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
