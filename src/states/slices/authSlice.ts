import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit'
import { authAPI } from 'api/rest'
import Cookie from 'js-cookie'
import { IUser, SignInType } from 'models/user'
import { getProfile } from 'states/slices/userSlice'
import { AppThunk } from 'states/store'
import { actions as userAction } from 'states/slices/userSlice'

interface IinitState {
    loading: boolean
    error: string
    state: 'stranger' | 'logged'
}

const initialState: IinitState = {
    loading: false,
    error: '',
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

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (userInfo: Partial<IUser>) => {
        try {
            const res = await authAPI.postRegister(userInfo)
            console.log(res)
        } catch (e) {
            console.log(e)
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(loginAsync.rejected, (state) => {
                state.loading = false
                state.error = 'Fail to login'
            })
            .addCase(loginAsync.fulfilled, (state) => {
                state.loading = false
                state.state = 'logged'
            })

            .addCase(registerAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(registerAsync.rejected, (state) => {
                state.loading = false
                state.error = 'Fail to register'
            })
            .addCase(registerAsync.fulfilled, (state) => {
                state.loading = false
            })
    },
})

export const loginWithToken = (): AppThunk => async (dispatch, getState) => {
    try {
        unwrapResult(await dispatch(getProfile()))
        dispatch(actions.login())
    } catch {
        console.error('Token unauthorized')
    }
}

export const logout = (): AppThunk => async (dispatch, getState) => {
    try {
        Cookie.remove('token')
        dispatch(actions.logout())
        dispatch(userAction.clearUser())
    } catch {
        console.error('Fail to logout')
    }
}

const { actions: authActions, reducer } = authSlice

export const actions = Object.assign(authActions, {
    loginAsync,
    registerAsync,
    loginWithToken,
    logout,
})

export default reducer
