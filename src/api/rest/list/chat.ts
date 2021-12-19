import Axios from 'api/rest/axios'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/Common'
import { IMessage } from 'models/message'
import queryString from 'query-string'

class ChatAPI {
    url = `chat`

    async create(members: ID[]) {
        return Axios.post<ID[]>(`${this.url}/create`, members)
    }
    async getRoom(members: ID[]) {
        return Axios.get<IChatRoom>(`${this.url}/getRoom?${queryString.stringify({ members })}`)

    }
    async sendMessage(messageInfo: Partial<IMessage>, roomId: string) {
        let form = new FormData()
        form.append("content", messageInfo.content || '')
        if (messageInfo.images) {
            for (const image of messageInfo.images)
                form.append("images", image)
        }

        return Axios.post(
            `${this.url}/addMessage/${roomId}`,
            form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )

    }
}

export const chatAPI = new ChatAPI()
