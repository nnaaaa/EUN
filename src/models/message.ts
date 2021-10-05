import { IChatRoom } from './chatRoom'
import { ID } from './Common'
import { IUser } from './user'

export interface IMessage {
    _id: ID
    chatRoom: IChatRoom | ID
    owner: IUser | ID
    content: string
    images: string[]
    createAt: Date
}
