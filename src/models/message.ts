import { IPublicInfo } from 'models/user'
import { ID } from './common'

export interface IMessage {
    _id: ID
    chatRoom: ID
    owner: ID | IPublicInfo
    content: string
    images: FileList | string[]
    createAt: Date
}
