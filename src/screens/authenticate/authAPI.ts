import { SERVER_EXPRESS } from 'config/keys'
import { IUser, SignInType } from 'models/user'
import Axios from 'api/axios'

class AuthAPI {
    async postLogin(credential: SignInType) {
        return Axios.post(`auth/login`, credential)
    }
    async postRegister(userInfo: IUser) {
        return Axios.post(`auth/register`, userInfo)
    }
}

export const authAPI = new AuthAPI()
