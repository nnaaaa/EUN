import { ID } from './../../models/Common'
import { PayloadAction } from '@reduxjs/toolkit'
import { IChatRoom } from 'models/chatRoom'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IChatRoom[] = []

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        closeChat(state, action: PayloadAction<ID>) {
            state = state.filter((room) => room._id !== action.payload)
        },
    },
})

export const { reducer, actions } = chatSlice

export default reducer
