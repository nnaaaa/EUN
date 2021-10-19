import {
    createSlice, PayloadAction
} from '@reduxjs/toolkit'
import { IPublicInfo } from 'models/user'

export type IFriendRole = 'accepted' | 'invited' | 'pending' | 'stranger'

export type IFriendPublicInfo = IPublicInfo & { role: IFriendRole }


interface IinitialState {
    loading: boolean
    error?: string
    current: {
        accepted: IPublicInfo[],
        invited: IPublicInfo[],
        pending: IPublicInfo[]
    }
}

const initialState: IinitialState = {
    loading: false,
    current: {
        accepted: [],
        invited: [],
        pending: []
    },
}


const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        updateStore: (state, action: PayloadAction<typeof initialState.current>) => {
            Object.assign(state.current,action.payload)
        }
    },
})

const { actions, reducer } = friendSlice
export const friendActions = Object.assign(actions, {
})
export default reducer
