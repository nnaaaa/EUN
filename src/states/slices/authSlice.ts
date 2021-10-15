import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { authAPI } from 'api/rest';
import Cookie from 'js-cookie';
import { SignInType } from 'models/user';
import { getProfile } from 'states/slices/userSlice';
import { AppThunk } from 'states/store';
import { actions as userAction } from 'states/slices/userSlice'

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
        },
        logout: (state) => {
            state.loading = false
            state.state = 'stranger'
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
            .addCase(loginAsync.fulfilled, (state) => {
                state.loading = false
                state.state = 'logged'
            })
    },
})

export const loginWithToken = (): AppThunk => async (dispatch, getState) => {
    try {
        unwrapResult(await dispatch(getProfile()))
        dispatch(actions.login())
    }
    catch {
        console.error('Token unauthorized')
    }
}

export const logout = (): AppThunk => async (dispatch, getState) => {
    try {
        Cookie.remove('token')
        dispatch(actions.logout())
        dispatch(userAction.clearUser())
    }
    catch {
        console.error('Fail to logout')
    }
}

export const { actions, reducer } = authSlice
export default reducer
