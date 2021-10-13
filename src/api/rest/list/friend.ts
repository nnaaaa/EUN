import { SERVER_EXPRESS } from 'config/keys'
import { IPublicInfo } from 'models/user'
import Axios from 'api/rest/axios'

class FriendAPI {
    url = `${SERVER_EXPRESS}/friend`

    async findById(userId: string) {
        return Axios.get<IPublicInfo>(`${this.url}/findUser/${userId}`)
    }
    async findByName(name: string) {
        return Axios.get<IPublicInfo[]>(`${this.url}/findListUser/${name}`)
    }
    async addFriend(friendId: string) {
        return Axios.post(`${this.url}/addRequest`, { friendId })
    }
    async acceptInvite(friendId: string) {
        return Axios.post(`${this.url}/acceptInvite`, { friendId })
    }
}

export const friendAPI = new FriendAPI()
