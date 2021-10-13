import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPublicInfo } from 'models/user';
import { userAPI } from '../../api/rest/list/user';

interface IinitState {
    loading: boolean
    error?: string
    current?: IPublicInfo
}

const initialState: IinitState = {
    loading: false,
}

export const getProfile = createAsyncThunk('user/getProfile', async () => {
    const response = await userAPI.getProfile()
    return response.data
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true
        }).addCase(getProfile.rejected, (state) => {
            state.loading = false
            state.error = 'Unauthorized'
        }).addCase(getProfile.fulfilled, (state,action) => {
            state.loading = false
            state.current = action.payload
        })
    }
})

export const { reducer, actions } = userSlice
export default reducer