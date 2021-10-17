import { SERVER_EXPRESS } from 'config/keys'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/Common'
import { IMessage } from 'models/message'
import Axios from 'api/rest/axios'
import queryString from 'query-string'

class ChatAPI {
    url = `${SERVER_EXPRESS}/chat`

    async create(members: ID[]) {
        return Axios.post<ID[]>(`${this.url}/create`, members)
    }
    async getRoom(members:ID[]) {
        return Axios.get<IChatRoom>(`${this.url}/getRoom?${queryString.stringify({ members })}`)
        
    }
    async sendMessage(roomInfo: IMessage) {
        return Axios.put<IMessage>(
            `${this.url}/addMessage/${roomInfo.owner}`,
            roomInfo
        )
    }
}

export const chatAPI = new ChatAPI()
