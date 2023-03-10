import { ID } from 'models/index'
import { IPublicInfo } from './user'

export interface INotification {
    _id: ID
    owner: IPublicInfo
    seen: ID[] | IPublicInfo[]
    sent: ID[] | IPublicInfo[]
    in?: {
        name: string
        path: string
    }
    path: string
    title: string
    createAt: Date
}
