import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { arrayIsContain } from 'algorithms/array';
import { chatAPI } from 'api/rest';
import { IChatRoom } from 'models/chatRoom';
import { ID } from 'models/Common';
import { IMessage } from 'models/message';
import { RootState } from 'states/store';

interface IinitalState{
    loading:boolean
    error?: string
    current: IChatRoom[]
}

const initialState: IinitalState={
    loading: false,
    current: []
}

const addChat = createAsyncThunk('chat/addOne',async (friendId: ID,thunkAPI) => {
    const userId = (thunkAPI.getState() as RootState).user.current._id
    if (!userId)
        throw new Error()
    const room = await chatAPI.getRoom([userId, friendId])
    return room.data
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        closeWindowChat(state, action: PayloadAction<ID[] | ID>) {
            //tắt bằng id phòng
            if (typeof action.payload === 'string')
                state.current = state.current.filter((room) => room._id !== action.payload)
            
            //tắt bằng thành viên trong phòng
            else if (typeof action.payload === 'object')
                state.current = state.current.filter(room => {
                    const listId = room.members.map(u => u._id)
                    return !arrayIsContain(listId, ...action.payload)
                })
        },
        insertMessage(state, action: PayloadAction<{ message:IMessage,roomId:ID }>) {
            state.current = state.current.map(room => {
                if (room._id === action.payload.roomId) {
                    const newMessages: IMessage[] = [...room.messages, action.payload.message]
                    return { ...room, messages: newMessages } 
                }
                return room 
            })    
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addChat.pending, (state) => {
            state.loading = true
        })
        .addCase(addChat.rejected, (state) => {
            state.loading = false
            state.error = 'Unauthorized'
        })
        .addCase(addChat.fulfilled, (state, action) => {
            state.loading = false
            state.current.push(action.payload)
        })
    }
})


const { reducer, actions } = chatSlice

export const chatActions = Object.assign(actions, {
    addChat
})

export default reducer
