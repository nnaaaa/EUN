import { SERVER_EXPRESS } from 'config/keys'
import { IUser, SignInType } from 'models/user'
import Axios from 'api/rest/axios'
import { AxiosResponse } from 'axios'

class AuthAPI {
    async postLogin(credential: SignInType) {
        return Axios.post<SignInType, AxiosResponse<{ token?: "string" }>>(`auth/login`, credential)
    }
    async postRegister(userInfo: IUser) {
        return Axios.post(`auth/register`, userInfo)
    }
}

export const authAPI = new AuthAPI()
