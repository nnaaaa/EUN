import { AxiosResponse } from 'axios'
import { IComment } from 'models/comment'
import { ID } from 'models/common'
import { IMessage } from 'models/message'
import { IPublicInfo } from 'models/user'

interface IPossess {
    _id: ID
    owner: IPublicInfo
    replies: IComment[]
    levelOrder: number
    participants: ID[] | IPublicInfo[]
}
interface IReduxActions {
    delete: (payload: { replyId: ID; possessId: ID }) => any
    addOrUpdate: (payload: IComment) => any
}
interface IReplyAPI {
    add: (replyInfo: Partial<IComment>, possessId: ID) => Promise<AxiosResponse<any>>
    get: (commentId: ID) => Promise<AxiosResponse<any>>
}
export default abstract class ReplyStrategy {
    private _possess: IPossess
    constructor(possess: IPossess) {
        this._possess = possess
    }
    abstract getReduxActions(): IReduxActions
    abstract getReplyAPI(): IReplyAPI
    public get possess() {
        return this._possess
    }
}
