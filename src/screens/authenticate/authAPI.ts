import Axios from 'api/restful-user/axios'
import { AxiosResponse } from 'axios'
import { IUser, SignInType } from 'models/user'


interface TokenResponse {
    accessToken?: string
    refreshToken?: string
}

class AuthAPI {
    async postLogin(credential: SignInType) {
        return Axios.post<SignInType, AxiosResponse<TokenResponse>>(
            `auth/login`,
            credential
        )
    }
    async postRegister(userInfo: Partial<IUser>) {
        return Axios.post(`auth/register`, userInfo)
    }
}

export const authAPI = new AuthAPI()
