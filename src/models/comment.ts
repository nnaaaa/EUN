import { ID } from './common'
import { IPost } from './post'
import { IPublicInfo } from './user'

export interface IComment {
    _id: ID
    post: IPost | ID
    owner: IPublicInfo | ID
    content: string
    images: string[]
    createAt: Date
}
