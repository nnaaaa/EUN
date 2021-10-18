import { IPublicInfo } from 'models/user';
import { ID } from './Common';

export interface IPost {
    _id: ID
    owner: IPublicInfo
    content: string
    images: string[]
    react?: {
        likes: IPublicInfo[]
        hearts: IPublicInfo[]
    }
    comment?: IPublicInfo[]
    createAt?: Date
    mode: 'private' | 'public' | 'friend'
}
