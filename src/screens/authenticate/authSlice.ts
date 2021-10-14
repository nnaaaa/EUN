import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from 'api/rest';
import Cookie from 'js-cookie';
import { SignInType } from 'models/user';
import { getProfile } from 'states/slices/userSlice';
import { AppThunk } from './../../states/store';

interface IinitState {
    loading: boolean
    error: SignInType
    state: 'stranger' | 'logged'
}

const initialState: IinitState = {
    loading: false,
    error: {
        account: '',
        password: '',
    },
    state: 'stranger',
}

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (credential: SignInType) => {
        const res = await authAPI.postLogin(credential)
        if (res.data.token) {
            Cookie.set('token', res.data.token)
        } else {
            throw new Error()
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.loading = false
            state.state = 'logged'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(loginAsync.rejected, (state) => {
                state.loading = false
                state.error.account = 'Fail Account'
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false
                state.state = 'logged'
            })
    },
})

export const loginWithToken = (): AppThunk => async (dispatch, getState) => {
    await dispatch(getProfile())
    dispatch(actions.login())
}

export const { actions, reducer } = authSlice
export default reducer
