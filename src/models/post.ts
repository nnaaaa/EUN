import { IPublicInfo } from 'models/user'
import { IComment } from './comment'
import { ID } from './common'

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
    comments?: IComment[]
    createAt?: Date
    mode: IModePost
}
