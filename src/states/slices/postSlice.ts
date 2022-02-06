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

// const getPosts = createAsyncThunk('post/get', async (userId: ID | undefined, thunkAPI) => {
//     // const userId = (thunkAPI.getState() as RootState).user.current._id
//     if (!userId) throw new Error()
//     const room = await postAPI.getFromAllUser()
//     return room.data
// })

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getMorePost(state, action: PayloadAction<IPost[]>) {
            state.current = state.current.concat(action.payload)
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
        deletePost(state, action: PayloadAction<ID>) {
            state.current = state.current.filter((post) => post._id !== action.payload)
        },
        updateReact(state, action: PayloadAction<{ react: IReact; postId: ID }>) {
            const { react, postId } = action.payload
            state.current = state.current.map((post) => {
                if (post._id === postId) {
                    return { ...post, react: { ...post.react,...react } }
                }
                return post
            })
        },
        getMoreComments(
            state,
            action: PayloadAction<{ comments: IComment[]; postId: ID }>
        ) {
            const { comments, postId } = action.payload
            state.current = state.current.map((post) => {
                if (post._id === postId) {
                    const newComments: IComment[] = [...post.comments, ...comments]
                    return { ...post, comments: newComments }
                }
                return post
            })
        },
        createOrUpdateComment(
            state,
            action: PayloadAction<{ comment: IComment; postId: ID }>
        ) {
            const { comment, postId } = action.payload
            state.current = state.current.map((post) => {
                if (post._id === postId) {
                    //nếu comment đã có thì tức là disptacher muốn cập nhật
                    const isExistComment = post.comments?.find(
                        (cmt) => cmt._id === comment._id
                    )
                    if (isExistComment) {
                        const updatedComments = post.comments.map((cmt) =>
                            cmt._id === comment._id ? { ...cmt, ...comment } : cmt
                        )
                        return { ...post, comments: updatedComments }
                    }
                    // nếu đã có comment chưa từng tồn tại thì thêm vào
                    else {
                        const newComments: IComment[] = [comment, ...post.comments]
                        return { ...post, comments: newComments }
                    }
                }
                return post
            })
        },
        deleteComment(state, action: PayloadAction<{ postId: ID; commentId: ID }>) {
            const { postId, commentId } = action.payload
            state.current = state.current.map((post) => {
                if (post._id === postId) {
                    const filteredComments = post.comments.filter(
                        (cmt) => cmt._id !== commentId
                    )
                    return { ...post, comments: filteredComments }
                }
                return post
            })
        },
        clear(state) {
            state.current = []
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getPosts.pending, (state) => {
    //             state.loading = true
    //         })
    //         .addCase(getPosts.fulfilled, (state, action) => {
    //             state.current = action.payload
    //             state.loading = false
    //         })
    //         .addCase(getPosts.rejected, (state) => {
    //             state.loading = false
    //             state.error = 'Load error'
    //         })
    // },
})

export const { actions, reducer } = postSlice

export const postActions = Object.assign(actions, {
    // getTheFirstTime: getPosts,
})

export default reducer
