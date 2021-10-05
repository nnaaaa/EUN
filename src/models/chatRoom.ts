import { IMessage } from './message'
import { ID } from './Common'
import { IUser } from './user'

export interface IChatRoom {
    _id: ID
    composing: ID[] | IUser[]
    members: ID[] | IUser[]
    messages: IMessage[]
}
