import { SERVER_EXPRESS } from 'config/keys'
import axios, { AxiosRequestConfig } from 'axios'
import queryString from 'query-string'
import Cookie from 'js-cookie'
const axiosClient = axios.create({
    baseURL: SERVER_EXPRESS,
    headers: {
        'content-type': 'application/json',
    },
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
            //save token here
        }

        return response
    },
    (error) => {
        // Handle errors
        throw error
    }
)
export default axiosClient
