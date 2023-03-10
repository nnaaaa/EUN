import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ID } from 'models/index'
import { IPost } from 'models/post'
import { IReact } from 'models/react'

interface IInitialState {
    loading: boolean
    error?: string
    current: IPost[]
}

const initialState: IInitialState = {
    loading: false,
    current: [],
}

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
                        ...action.payload,
                    }
                return post
            })
        },
        deletePost(state, action: PayloadAction<ID>) {
            state.current = state.current.filter((post) => post._id !== action.payload)
        },
        addOrUpdateReactToPost(
            state,
            action: PayloadAction<{ react: IReact; possessId: ID }>
        ) {
            const { react, possessId } = action.payload
            state.current = state.current.map((post) => {
                if (post._id === possessId) {
                    const isReacted = post.reacts.find((r) => r._id === react._id)
                    if (isReacted) {
                        const updatedReacts = post.reacts.map((r) =>
                            r._id === react._id ? react : r
                        )
                        return { ...post, reacts: updatedReacts }
                    }
                    // nếu react chưa từng tồn tại thì thêm vào
                    else {
                        post.reacts.push(react)
                        return post
                    }
                }
                return post
            })
        },
        deleteReactFromPost(
            state,
            action: PayloadAction<{ reactId: ID; possessId: ID }>
        ) {
            const { reactId, possessId } = action.payload
            state.current = state.current.map((post) => {
                if (post._id === possessId) {
                    post.reacts = post.reacts.filter((r) => r._id !== reactId)
                }
                return post
            })
        },

        clear(state) {
            state.current = []
        },
    },
})

export const { actions, reducer } = postSlice

export const postActions = Object.assign(actions, {})

export default reducer
