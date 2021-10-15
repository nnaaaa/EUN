import { AppThunk } from './../store';
import { IPublicInfo, IUser } from 'models/user';
import { createSlice, createAsyncThunk, unwrapResult, PayloadAction } from '@reduxjs/toolkit';
import {friendAPI} from 'api/rest'
import { filterSearch } from 'algorithms/filterSearch';

type FriendRole = 'accept' | 'inviting' | 'pending'

type IFriendPublicInfo = IPublicInfo & { role: FriendRole }

interface IinitialState{
    loading: boolean
    error?: string
    current: IFriendPublicInfo[]
}

const initialState:IinitialState = {
    loading: false,
    current: []
}

export const acceptInvite = createAsyncThunk('friend/acceptInvite', async (friendId: string) => {
   await friendAPI.acceptInvite(friendId)
})
export const getListFriend = createAsyncThunk('friend/getListFriend', async (name: string) => {
    const response = await friendAPI.findByName(name)
    return response.data
})

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        findByNameSuccess: (state,action:PayloadAction<IFriendPublicInfo[]>) => {
            state.current = action.payload
        }
    },
    extraReducers:(builder)=> {
        builder
            .addCase(acceptInvite.pending, (state) => {
            state.loading = true
        }).addCase(acceptInvite.rejected, (state) => {
            state.loading = false
            state.error = 'Load fail'
        }).addCase(acceptInvite.fulfilled, (state) => {
            state.loading = false
        })
            .addCase(getListFriend.pending, (state) => {
            state.loading = true
        }).addCase(getListFriend.rejected, (state) => {
            state.loading = false
            state.error = 'Load fail'
        }).addCase(getListFriend.fulfilled, (state) => {
            state.loading = false
        })
    }
})

export const findByName = (name: string): AppThunk => async (dispatch, getState) => {
    try {
        const listUser = unwrapResult(await dispatch(getListFriend(name)))
        const myInfo = getState().user.current
        const filterData = filterSearch(listUser, myInfo, name)
        dispatch(actions.findByNameSuccess(filterData))
    }
    catch {
        console.error('Fail to find by name')
    }
}

export const { actions, reducer } = friendSlice
export default reducer