import Axios from 'api/rest/axios'
import { ID } from 'models/common'
import { IPublicInfo } from 'models/user'

class FriendAPI {
    url = `friend`

    async findById(userId: ID) {
        return Axios.get<IPublicInfo>(`${this.url}/findUser/${userId}`)
    }
    async findByName(name: string) {
        return Axios.get<IPublicInfo[]>(`${this.url}/findListUser/${name}`)
    }
    async addInvite(friendId: ID) {
        return Axios.put(`${this.url}/addInvite`, { friendId })
    }
    async cancelInvite(friendId: ID) {
        return Axios.put(`${this.url}/cancelInvite`, { friendId })
    }
    async refuseInvite(friendId: ID) {
        return Axios.put(`${this.url}/refuseInvite`, { friendId })
    }
    async acceptInvite(friendId: ID) {
        return Axios.put(`${this.url}/acceptInvite`, { friendId })
    }
    async removeFriend(friendId: ID) {
        return Axios.put(`${this.url}/removeFriend`, { friendId })
    }
}

export const friendAPI = new FriendAPI()
