import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IComment } from 'models/comment'
import { ID } from 'models/common'
import { IPost } from 'models/post'
import { IReact } from 'models/react'

interface IInitialState {
    loading: boolean
    error?: string
    current: { _id: ID; comments: IComment[] }[]
}

const initialState: IInitialState = {
    loading: false,
    current: [],
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        addPossess(state, action: PayloadAction<{ _id: ID; comments: IComment[] }>) {
            state.current.push(action.payload)
        },
        removePossess(state, action: PayloadAction<ID>) {
            state.current = state.current.filter(
                (possess) => possess._id !== action.payload
            )
        },

        getMoreComments(
            state,
            action: PayloadAction<{ comments: IComment[]; possessId: ID }>
        ) {
            const { comments, possessId } = action.payload
            state.current = state.current.map((possess) => {
                if (possess._id === possessId) {
                    possess.comments = possess.comments.concat(comments)
                }
                return possess
            })
        },
        addOrUpdateComment(state, action: PayloadAction<IComment>) {
            const comment = action.payload
            state.current = state.current.map((possess) => {
                if (possess._id === comment.possess) {
                    //nếu comment đã có thì tức là disptacher muốn cập nhật
                    const isExistComment = possess.comments?.find(
                        (cmt) => cmt._id === comment._id
                    )
                    if (isExistComment) {
                        possess.comments = possess.comments.map((cmt) =>
                            cmt._id === comment._id ? { ...cmt, ...comment } : cmt
                        )
                    }
                    // nếu comment chưa từng tồn tại thì thêm vào
                    else {
                        possess.comments.unshift(comment)
                    }
                }
                return possess
            })
        },
        deleteComment(state, action: PayloadAction<{ possessId: ID; commentId: ID }>) {
            const { possessId, commentId } = action.payload
            state.current = state.current.map((possess) => {
                if (possess._id === possessId) {
                    possess.comments = possess.comments.filter(
                        (cmt) => cmt._id !== commentId
                    )
                }
                return possess
            })
        },

        addOrUpdateReactToComment(
            state,
            action: PayloadAction<{ react: IReact; possessId: ID }>
        ) {
            const { react, possessId } = action.payload
            state.current = state.current.map((post) => {
                post.comments = post.comments.map((comment) => {
                    if (comment._id === possessId) {
                        const isReacted = comment.reacts.find((r) => r._id === react._id)
                        if (isReacted) {
                            const updatedReacts = comment.reacts.map((r) =>
                                r._id === react._id ? react : r
                            )
                            return { ...comment, reacts: updatedReacts }
                        }
                        // nếu react chưa từng tồn tại thì thêm vào
                        else {
                            comment.reacts.push(react)
                            return comment
                        }
                    }
                    return comment
                })
                return post
            })
        },
        deleteReactFromComment(
            state,
            action: PayloadAction<{ reactId: ID; possessId: ID }>
        ) {
            const { reactId, possessId } = action.payload
            state.current = state.current.map((post) => {
                post.comments = post.comments.map((comment) => {
                    if (comment._id === possessId) {
                        comment.reacts = comment.reacts.filter((r) => r._id !== reactId)
                    }
                    return comment
                })
                return post
            })
        },

        clear(state) {
            state.current = []
        },
    },
})

export const { actions, reducer } = commentSlice

export const commentActions = Object.assign(actions, {})

export default reducer
