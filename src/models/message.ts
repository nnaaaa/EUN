import { IPublicInfo } from 'models/user'
import { ID } from './common'
import { IReact } from './react'

export interface IMessage {
    _id: ID
    chatRoom: ID
    owner: IPublicInfo
    content: string
    images: FileList | string[]
    createAt: Date
    seen: ID[] | IPublicInfo[]
    sent: ID[] | IPublicInfo[]
    reacts: IReact[]
}
