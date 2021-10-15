import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPublicInfo } from 'models/user';
import { userAPI } from '../../api/rest/list/user';

interface IinitState {
    loading: boolean
    error?: string
    current: Partial<IPublicInfo>
}

const initialState: IinitState = {
    loading: false,
    current:{}
}

export const getProfile = createAsyncThunk('user/getProfile', async () => {
    const response = await userAPI.getProfile()
    if (response.data)
        return response.data
    else
        throw new Error()
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.loading = false
            state.current = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(getProfile.rejected, (state) => {
                state.loading = false
                state.error = 'Unauthorized'
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false
                state.current = action.payload
            })
    },
})



export const { reducer, actions } = userSlice
export default reducer
