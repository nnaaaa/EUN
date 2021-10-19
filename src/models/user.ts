import { ID } from './Common'
export interface SignInType {
    account: string
    password: string
}
export interface IPrivateInfo {
    password: boolean
    token: boolean
}

export type IPublicInfo = Omit<IUser, keyof IPrivateInfo>

export interface IUser {
    _id: ID
    username: string
    account: string
    password: string
    avatar?: string

    friends: {
        accepted: IPublicInfo[]
        invited: IPublicInfo[]
        pending: IPublicInfo[]
    }


    isOnline: boolean
    token: string
}
