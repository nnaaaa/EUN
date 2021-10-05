import { ID } from './Common'
import { IPost } from './post'
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
        accepted: ID[] | IUser[]
        invited: ID[] | IUser[]
        pending: ID[] | IUser[]
    }

    posts: ID[] | IPost[]

    isOnline: boolean
    token: string
}
