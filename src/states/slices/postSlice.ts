import { IReact } from 'models/react'
import { IComment } from 'models/comment'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { postAPI } from 'api/rest'
import { ID } from 'models/common'
import { IPost } from 'models/post'

interface IInitialState {
    loading: boolean
    error?: string
    current: IPost[]
}

const initialState: IInitialState = {
    loading: false,
    current: [],
}

const getPost = createAsyncThunk('post/get', async (userId: ID | undefined, thunkAPI) => {
    // const userId = (thunkAPI.getState() as RootState).user.current._id
    if (!userId) throw new Error()
    const room = await postAPI.getFromAllUser()
    return room.data
})

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        insertComment(state, action: PayloadAction<{ comment: IComment; postId: ID }>) {
            state.current = state.current.map((post) => {
                if (post._id === action.payload.postId) {
                    const newComments: IComment[] = [
                        action.payload.comment,
                        ...(post.comments as IComment[]),
                    ]
                    return { ...post, comments: newComments }
                }
                return post
            })
        },
        updateReact(state, action: PayloadAction<{ react: IReact; postId: ID }>) {
            state.current = state.current.map((post) => {
                if (post._id === action.payload.postId) {
                    return { ...post, react: action.payload.react }
                }
                return post
            })
        },
        insertPost(state, action: PayloadAction<IPost>) {
            state.current.unshift(action.payload)
        },
        updatePost(state, action: PayloadAction<IPost>) {
            state.current = state.current.map((post) => {
                if (post._id === action.payload._id)
                    return {
                        ...post,
                        content: action.payload.content,
                        images: action.payload.images,
                        mode: action.payload.mode,
                    }
                return post
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPost.pending, (state) => {
                state.loading = true
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.current = action.payload
                state.loading = false
            })
            .addCase(getPost.rejected, (state) => {
                state.loading = false
                state.error = 'Load error'
            })
    },
})

export const { actions, reducer } = postSlice

export const postActions = Object.assign(actions, {
    getTheFirstTime: getPost,
})

export default reducer
