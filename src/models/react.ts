import { ID } from './common'
import { IPost } from './post'
import { IPublicInfo } from './user'

export type IEmotionList = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

type IRecordType = Record<IEmotionList, IPublicInfo[]>

type IEmotion = {
    [Property in keyof IRecordType]: IPublicInfo[]
}

export interface IReact extends IEmotion {
    _id: ID
}
