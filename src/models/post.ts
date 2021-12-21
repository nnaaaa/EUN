import { IPublicInfo } from 'models/user';
import { ID } from './Common';


export type IModePost = 'private' | 'public' | 'friend'
export interface IPost {
    _id: ID
    owner: IPublicInfo
    content: string
    images: string[]
    react?: {
        likes: IPublicInfo[]
        hearts: IPublicInfo[]
    }
    comments?: IPublicInfo[]
    createAt?: Date
    mode: IModePost
}
