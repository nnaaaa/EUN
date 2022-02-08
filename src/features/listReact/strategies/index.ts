import { AxiosResponse } from 'axios'
import { ID } from 'models/common'
import { IReact } from 'models/react'

interface IPossess {
    reacts: IReact[]
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
    constructor(possess: { reacts: IReact[]; _id: ID }) {
        this._possess = possess
    }
    public get possess() {
        return this._possess
    }
    abstract getReduxActions(): IReduxActions
    abstract getReactAPI(): IReactAPI
}
