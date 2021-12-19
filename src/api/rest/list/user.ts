import Axios from 'api/rest/axios'
import { IPublicInfo, IUser } from 'models/user'


class UserAPI {
    url = `user`

    async getProfile() {
        return Axios.get<IPublicInfo>(`${this.url}/getProfile`)
    }
    async getListUser() {
        return Axios.get<IPublicInfo[]>(`${this.url}/getListUser`)
    }
    async updateProfile(userInfo: Partial<IUser>) {
        return Axios.put(`${this.url}/updateProfile`, userInfo)
    }
    async getRelevantImage(userId: string) {
        return Axios.get(`${this.url}/relevantImages/${userId}`)
    }
}

export const userAPI = new UserAPI()
