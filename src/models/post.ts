import { IPublicInfo } from 'models/user'
import { IComment } from './comment'
import { ID } from './common'



export type IEmotionList = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

export type IModePost = 'private' | 'public' | 'friend'

export interface IPost {
    _id: ID
    owner: IPublicInfo
    content: string
    images: string[]
    react?: Record<IEmotionList,Partial<IPublicInfo>[]>
    comments?: IComment[]
    createAt?: Date
    mode: IModePost
}

