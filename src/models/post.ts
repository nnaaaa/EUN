import { ID } from './Common'
import { IUser } from './user'

export interface IPost {
    _id: ID
    owner: IUser | ID
    content: string
    images: string[]
    react?: {
        likes: ID[] | IUser[]
        hearts: ID[] | IUser[]
    }
    comment?: ID[] | IUser[]
    createAt?: Date
    mode: 'private' | 'public' | 'friend'
}
