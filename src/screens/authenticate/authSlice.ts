import { SignInType, IUser } from 'models/user';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from 'api'


interface IinitState{
    loading: boolean
    error: SignInType
    current?: IUser
}

const initialState:IinitState = {
    loading: false,
    error: {
        account: '',
        password:''
    }
}

export const loginAsync = createAsyncThunk('auth/login', async(credential: SignInType) => {
    const res = await authAPI.postLogin(credential)
    return res.data
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending,(state)=> {
            state.loading = true
        }).addCase(loginAsync.rejected, (state) => {
            state.loading = false
            state.error.account = 'Fail Account'
        }).addCase(loginAsync.fulfilled, (state, action) => {
            state.loading = false
        })
    }
})

export const { actions, reducer } = authSlice
export default reducer
