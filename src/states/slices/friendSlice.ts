import { IUser } from 'models/user';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {friendAPI} from 'api/rest'

interface IInitialState{
    loading: boolean
    error?: string
    current: IUser[]
}

const initialState:IInitialState = {
    loading: false,
    current: []
}

export const acceptInvite = createAsyncThunk('friend/acceptInvite', async (friendId: string) => {
   await friendAPI.acceptInvite(friendId)
})


const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {},
    extraReducers:(builder)=> {
        builder.addCase(acceptInvite.pending, (state) => {
            state.loading = true
        }).addCase(acceptInvite.rejected, (state) => {
            state.loading = false
            state.error = 'Load fail'
        }).addCase(acceptInvite.fulfilled, (state) => {
            state.loading = false
        })
    }
})

export const { actions, reducer } = friendSlice
export default reducer