import Axios, { imagesConditon } from 'api/rest/axios'
import { IChatRoom } from 'models/chatRoom'
import { ID, IQueryPost } from 'models/common'
import { IMessage } from 'models/message'
import queryString from 'query-string'

class ChatAPI {
    url = `chat`

    async create(members: ID[]) {
        return Axios.post(`${this.url}/create`, { members })
    }
    async getListRoomFromTime(query: Partial<IQueryPost>, fromTime: Date) {
        return Axios.get<IChatRoom[]>(`${this.url}/getListRoomFromTime/${fromTime}?${queryString.stringify(query)}`)
    }
    async getMessagesFromTime(query:Partial<IQueryPost>, roomId: ID, fromTime: Date) {
        return Axios.get<IChatRoom[]>(
            `${this.url}/getMessage/${roomId}/${fromTime}?${queryString.stringify(query)}`
        )
    }
    async seenMessages(roomId: ID) {
        return Axios.put(`${this.url}/seenMessages/${roomId}`)
    }
    async sendMessage(messageInfo: Partial<IMessage>, roomId: string) {
        let form = new FormData()
        form.append('content', messageInfo.content || '')
        if (messageInfo.images) {
            for (const image of messageInfo.images) form.append('images', image)
        }

        return Axios.post(`${this.url}/addMessage/${roomId}`, form, imagesConditon)
    }
    async deleteMessage(messageInfo: IMessage) {
        return Axios.delete(`${this.url}/deleteMessage/${messageInfo._id}`)
    }
}

export const chatAPI = new ChatAPI()
