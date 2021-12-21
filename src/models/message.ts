import { IPublicInfo } from 'models/user';
import { ID } from './Common';

export interface IMessage {
    _id: ID
    chatRoom: ID
    owner: ID | IPublicInfo
    content: string
    images: FileList | string[]
    createAt: Date
}
