import Axios from 'api/rest/axios'
import { ID } from 'models/common'
import { IPublicInfo } from 'models/user'

class FriendAPI {
    url = `friend`

    async findById(userId: string) {
        return Axios.get<IPublicInfo>(`${this.url}/findUser/${userId}`)
    }
    async findByName(name: string) {
        return Axios.get<IPublicInfo[]>(`${this.url}/findListUser/${name}`)
    }
    async addFriend(friendId: ID) {
        return Axios.post(`${this.url}/addRequest`, { friendId })
    }
    async acceptInvite(friendId: string) {
        return Axios.post(`${this.url}/acceptInvite`, { friendId })
    }
}

export const friendAPI = new FriendAPI()
