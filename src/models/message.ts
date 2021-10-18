import { IPublicInfo } from 'models/user';
import { ID } from './Common';

export interface IMessage {
    _id: ID
    chatRoom: ID
    owner: IPublicInfo
    content: string
    images: string[]
    createAt: Date
}
