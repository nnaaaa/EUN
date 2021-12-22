import { IPublicInfo } from 'models/user'
import { ID } from './common'
import { IMessage } from './message'

export interface IChatRoom {
    _id: ID
    composing: IPublicInfo[]
    members: IPublicInfo[]
    messages: IMessage[]
}
