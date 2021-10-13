import { SERVER_EXPRESS } from 'config/keys';
import { IChatRoom } from 'models/chatRoom';
import { ID } from 'models/Common';
import { IMessage } from 'models/message';
import Axios from 'api/rest/axios';

class ChatAPI {
    url = `${SERVER_EXPRESS}/chat`

    async create(members: ID[]) {
        return Axios.post<Partial<IChatRoom>>(`${this.url}/create`, { members })
    }
    async getRoom(roomId: ID) {
        return Axios.get<IChatRoom>(`${this.url}/getRoom/${roomId}`)
    }
    async sendMessage(roomInfo: IMessage) {
        return Axios.put<IMessage>(`${this.url}/addMessage/${roomInfo.owner}`,roomInfo)
    }
}

export const chatAPI =  new ChatAPI()
