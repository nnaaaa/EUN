import { AxiosResponse } from 'axios'
import { ID } from 'models/common'
import { IReact } from 'models/react'
import { IPublicInfo } from 'models/user'

interface IPossess {
    reacts: IReact[]
    participants: ID[] | IPublicInfo[]
    _id: ID
}
interface IReduxActions {
    deleteReact: (payload: { reactId: ID; possessId: ID }) => any
    addOrUpdateReact: (payload: { react: IReact; possessId: ID }) => any
}
interface IReactAPI {
    addReact: (newReact: Omit<IReact, '_id'>) => Promise<AxiosResponse<any>>
}

export default abstract class ReactStrategy {
    private _possess: IPossess
    constructor(possess: IPossess) {
        this._possess = possess
    }
    public get possess() {
        return this._possess
    }
    abstract getReduxActions(): IReduxActions
    abstract getReactAPI(): IReactAPI
}
