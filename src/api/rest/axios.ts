import { SERVER_EXPRESS } from 'config/keys'
import axios, { AxiosRequestConfig } from 'axios'
import queryString from 'query-string'
import Cookie from 'js-cookie'

export const normalCondition = {
    headers: {
        'content-type': 'application/json',
    },
}
export const imagesConditon = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}
const axiosClient = axios.create({
    baseURL: SERVER_EXPRESS,
    ...normalCondition,
    paramsSerializer: (params) => queryString.stringify(params),
})
axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    // Handle token here ...
    if (config && config.headers) {
        const token = Cookie.get('token')
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
})
axiosClient.interceptors.response.use(
    (response) => {
        if (!response) return
        if (response.headers && response.headers.token) {
            Cookie.set('token', response.headers.accessToken)
        }

        return response
    },
    (error) => {
        // Handle errors
        throw error
    }
)

export default axiosClient
