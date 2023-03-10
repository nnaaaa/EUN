import queryString from 'query-string'
import Axios from 'api/rest/axios'
import { ID, IQueryPost } from 'models/index'
import { IPublicInfo } from 'models/user'

class FriendAPI {
    url = `friend`

    async findById(userId: ID) {
        return Axios.get<IPublicInfo>(`${this.url}/findById/${userId}`)
    }
    async findByAccount(account: string) {
        return Axios.get<IPublicInfo>(`${this.url}/findByAccount/${account}`)
    }
    async findAllUserByName(query: IQueryPost, name: string) {
        return Axios.get<IPublicInfo[]>(
            `${this.url}/findListUser/${name}?${queryString.stringify(query)}`
        )
    }
    async findFriendByName(query: IQueryPost, name: string) {
        return Axios.get<IPublicInfo[]>(
            `${this.url}/findListFriend/${name}?${queryString.stringify(query)}`
        )
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
