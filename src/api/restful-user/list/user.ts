import Axios, { imagesConditon } from 'api/restful-user/axios'
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
        let form = new FormData()
        // for (const key in userInfo) {
        //     const value = userInfo[key as keyof IPublicInfo]
        //     if (value)
        //         form.append(key,value.toString())
        // }
        if (userInfo.username) form.append('username', userInfo.username)
        if (userInfo.education) form.append('education', userInfo.education)

        if (userInfo.isOnline || userInfo.isOnline === false)
            form.append('isOnline', userInfo.isOnline.toString())

        if (userInfo.avatar) form.append('avatar', userInfo.avatar)
        if (userInfo.hobbies) {
            for (const hobbie of userInfo.hobbies) form.append('hobbies', hobbie)
        }

        return Axios.put(`${this.url}/updateProfile`, form, imagesConditon)
    }
    async getRelevantImage(userId: string) {
        return Axios.get(`${this.url}/relevantImages/${userId}`)
    }
}

export const userAPI = new UserAPI()
