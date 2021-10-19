import { ID } from './Common';

export interface IMessage {
    _id: ID
    chatRoom: ID
    owner: ID
    content: string
    images: string[]
    createAt: Date
}
