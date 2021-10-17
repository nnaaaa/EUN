import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userAPI } from 'api/rest/list/user'
import { IPublicInfo } from 'models/user'

interface IinitState {
    loading: boolean
    error?: string
    current: Partial<IPublicInfo>
}

const initialState: IinitState = {
    loading: false,
    current: {},
}

const getProfile = createAsyncThunk('user/getProfile', async () => {
    const response = await userAPI.getProfile()
    if (response.data) return response.data
    else throw new Error()
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.current = {}
        },
        updateStore: (state, action: PayloadAction<IPublicInfo>) => {
            Object.assign(state.current,action.payload)
        },
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



const { reducer, actions } = userSlice
export const userActions = Object.assign(actions, {
    getProfile
})
export default reducer
