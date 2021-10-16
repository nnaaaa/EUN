import { AppThunk } from 'states/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPublicInfo } from 'models/user'
import { userAPI } from 'api/rest/list/user'
import { actions as friendActions } from 'states/slices/friendSlice'

interface IinitState {
    loading: boolean
    error?: string
    current: Partial<IPublicInfo>
}

const initialState: IinitState = {
    loading: false,
    current: {},
}

export const getProfile = createAsyncThunk('user/getProfile', async () => {
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
            state.current = action.payload
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

export const updateUserStore =
    (userInfo: IPublicInfo): AppThunk =>
    (dispatch, getState) => {
        dispatch(actions.updateStore(userInfo))
        dispatch(friendActions.updateRole(userInfo))
    }

export const { reducer, actions } = userSlice
export default reducer
