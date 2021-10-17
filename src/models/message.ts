import { IChatRoom } from './chatRoom'
import { ID } from './Common'
import { IUser } from './user'

export interface IMessage {
    _id: ID
    chatRoom: ID
    owner: IUser
    content: string
    images: string[]
    createAt: Date
}
