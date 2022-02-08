import { AxiosResponse } from 'axios'
import { IComment } from 'models/comment'
import { ID } from 'models/common'

interface IPossess {
    _id: ID
    comments: IComment[]
    levelOrder: number
}
interface IReduxActions {
    deleteComment: (payload: { commentId: ID; possessId: ID }) => any
    addOrUpdateComment: (payload: IComment) => any
}
interface ICommentAPI {
    addComment: (
        commentInfo: Partial<IComment>,
        possessId: ID
    ) => Promise<AxiosResponse<any>>
    getComment: (commentId: ID) => Promise<AxiosResponse<any>>
}
export default abstract class CommentStrategy {
    private _possess: IPossess
    constructor(possess: IPossess) {
        this._possess = possess
    }
    abstract getReduxActions(): IReduxActions
    abstract getCommentAPI(): ICommentAPI
    public get possess() {
        return this._possess
    }
}
