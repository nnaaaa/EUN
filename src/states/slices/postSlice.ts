import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postAPI } from "api/rest";
import { ID } from "models/Common";
import { IPost } from "models/post";

interface IInitialState{
    loading: boolean
    error?: string
    current: IPost[]
}

const initialState: IInitialState = {
    loading: false,
    current: []
}

const getPost = createAsyncThunk('post/get',async (userId: ID | undefined,thunkAPI) => {
    // const userId = (thunkAPI.getState() as RootState).user.current._id
    if (!userId)
        throw new Error()
    const room = await postAPI.getFromAllUser()
    return room.data
})


const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getPost.pending, (state) => {
            state.loading = true;
        })
        .addCase(getPost.fulfilled, (state, action) => {
            state.current = action.payload
            state.loading = false;
        })
        .addCase(getPost.rejected, (state) => {
            state.loading = false;
            state.error = "Load error"
        })
    }
})

export const {actions,reducer} = postSlice

export const postActions = Object.assign(actions, {
    getTheFirstTime:getPost
})

export default reducer