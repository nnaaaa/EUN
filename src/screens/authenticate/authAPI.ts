import Axios from 'api/rest/axios'
import { AxiosResponse } from 'axios'
import { IUser, SignInType } from 'models/user'

class AuthAPI {
    async postLogin(credential: SignInType) {
        return Axios.post<SignInType, AxiosResponse<{ token?: 'string' }>>(
            `auth/login`,
            credential
        )
    }
    async postRegister(userInfo: Partial<IUser>) {
        return Axios.post(`auth/register`, userInfo)
    }
}

export const authAPI = new AuthAPI()
