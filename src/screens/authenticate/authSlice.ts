import { userAPI } from 'api/rest/list/user'
import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit'
import { authAPI } from 'api/rest'
import Cookie from 'js-cookie'
import { IUser, SignInType } from 'models/user'
import { userActions } from 'states/slices/userSlice'
import { AppThunk } from 'states/store'

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

const loginAsync = createAsyncThunk('auth/login', async (credential: SignInType) => {
    const res = await authAPI.postLogin(credential)
    if (res.data.token) {
        Cookie.set('token', res.data.token)
        await userAPI.updateProfile({ isOnline: true })
    } else {
        throw new Error()
    }
})

const registerAsync = createAsyncThunk(
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

const loginWithToken = (): AppThunk => async (dispatch, getState) => {
    try {
        await userAPI.updateProfile({ isOnline: true })
        unwrapResult(await dispatch(userActions.getProfile()))
        dispatch(actions.login())
    } catch {
        console.error('Token unauthorized')
    }
}

const logoutAsync = (): AppThunk => async (dispatch, getState) => {
    try {
        await userAPI.updateProfile({ isOnline: false })
        Cookie.remove('token')
        dispatch(authActions.logout())
        dispatch(userActions.clearUser())
    } catch {
        console.error('Fail to logout')
    }
}

const { actions, reducer } = authSlice

export const authActions = Object.assign(actions, {
    loginAsync,
    registerAsync,
    loginWithToken,
    logoutAsync,
})

export default reducer
