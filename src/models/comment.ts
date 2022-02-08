import { ID } from './common'
import { IReact } from './react'
import { IPublicInfo } from './user'

export interface IComment {
    _id: ID
    possess: ID
    owner: IPublicInfo | ID
    content: string
    images: string[]
    createAt: Date
    comments: IComment[]
    reacts: IReact[]
    levelOrder: number
}
