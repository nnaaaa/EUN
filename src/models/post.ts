import { IPublicInfo } from 'models/user'
import { IComment } from './comment'
import { ID } from './common'
import { IReact } from './react'

export type IModePost = 'private' | 'public' | 'friend'

export interface IPost {
    _id: ID
    owner: IPublicInfo
    content: string
    images: string[]
    reacts: IReact[]
    comments: IComment[]
    createAt: Date
    mode: IModePost
    participants: IPublicInfo[] | ID[]
}
