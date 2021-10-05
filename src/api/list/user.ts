import { SERVER_EXPRESS } from 'config/keys'
import { IPublicInfo, IUser } from 'models/user'

import Axios from 'api/axios'

class UserAPI {
    url = `${SERVER_EXPRESS}/user`

    async getProfile() {
        return Axios.get<IPublicInfo>(`${this.url}/getProfile`)
    }
    async updateProfile(userInfo: IUser) {
        return Axios.put(`${this.url}/updateProfile`, userInfo)
    }
    async getRelevantImage(userId: string) {
        return Axios.get(`${this.url}/relevantImages/${userId}`)
    }
}

export const userAPI = new UserAPI()
