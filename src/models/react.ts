import { ID } from './common'
import { IPublicInfo } from './user'

export type IPostEmotionList = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'
export type IEmoji = Pick<IReact, 'icon' | 'label'>

export interface IReact {
    _id: ID
    possess: ID
    icon: string
    label: string
    owner: IPublicInfo | ID
}
