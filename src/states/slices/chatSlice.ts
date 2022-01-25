import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chatAPI } from 'api/rest'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/common'
import { IMessage } from 'models/message'

interface IinitalState {
    loading: boolean
    error?: string
    listRoom: IChatRoom[]
    currentWindow: IChatRoom[]
}

const initialState: IinitalState = {
    loading: false,
    listRoom: [],
    currentWindow: [],
}

// const addWindowChat = createAsyncThunk('chat/openWindow', async (roomId: ID) => {
//     const res = await chatAPI.getNewestMessageOfRoom(roomId)
//     if (!res.data) throw new Error()
//     await chatAPI.seenMessages(roomId)
//     return { messages: res.data, roomId }
// })

const getListRoom = createAsyncThunk('chat/getListRoom', async () => {
    const res = await chatAPI.getListRoomWithNewMessages()
    return res.data
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addWindowChat(state, action: PayloadAction<ID>) {
            const roomId = action.payload
            const room = state.listRoom.find((r) => r._id === roomId)
            if (!room) return
            state.currentWindow.push(room)
        },
        closeWindowChat(state, action: PayloadAction<ID>) {
            state.currentWindow = state.currentWindow.filter(
                (room) => room._id !== action.payload
            )
        },
        getMessagesTheFirstTime(
            state,
            action: PayloadAction<{ messages: IMessage[]; roomId: ID }>
        ) {
            const { messages, roomId } = action.payload
            state.currentWindow = state.currentWindow.map((room) => {
                if (room._id === roomId) {
                    room.messages = messages
                }
                return room
            })
        },
        getMoreMessages(
            state,
            action: PayloadAction<{ messages: IMessage[]; roomId: ID }>
        ) {
            const { messages, roomId } = action.payload
            state.currentWindow = state.currentWindow.map((room) => {
                if (room._id === roomId) {
                    room.messages = room.messages.concat(messages)
                }
                return room
            })
        },
        insertMessage(state, action: PayloadAction<IMessage>) {
            const message = action.payload
            state.listRoom = state.listRoom.map((room) => {
                if (room._id === message.chatRoom) {
                    room.messages.unshift(message)
                }
                return room
            })
            state.currentWindow = state.currentWindow.map((room) => {
                if (room._id === message.chatRoom) {
                    room.messages.unshift(message)
                }
                return room
            })
        },
        updateMessage(state, action: PayloadAction<IMessage>) {
            const message = action.payload
            state.listRoom = state.listRoom.map((room) => {
                if (room._id === message.chatRoom) {
                    room.messages = room.messages.map((msg) =>
                        msg._id === message._id ? message : msg
                    )
                }
                return room
            })
        },
        removeMessage(state, action: PayloadAction<{ roomId: ID; messageId: ID }>) {
            const { roomId, messageId } = action.payload
            state.listRoom = state.listRoom.map((room) => {
                if (room._id === roomId) {
                    room.messages = room.messages.filter((msg) => msg._id !== messageId)
                }
                return room
            })
            state.currentWindow = state.currentWindow.map((room) => {
                if (room._id === roomId) {
                    room.messages = room.messages.filter((msg) => msg._id !== messageId)
                }
                return room
            })
        },
        clear(state) {
            state.currentWindow = []
            state.listRoom = []
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(addWindowChat.pending, (state) => {
            //     state.loading = true
            // })
            // .addCase(addWindowChat.rejected, (state) => {
            //     state.loading = false
            //     state.error = 'Unauthorized'
            // })
            // .addCase(addWindowChat.fulfilled, (state, action) => {
            //     const { messages, roomId } = action.payload
            //     state.loading = false
            //     const room = state.listRoom.find(r => r._id === roomId)
            //     if (!room) return
            //     state.currentWindow.push(room)
            // })
            .addCase(getListRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(getListRoom.rejected, (state) => {
                state.loading = false
                state.error = 'Unauthorized'
            })
            .addCase(getListRoom.fulfilled, (state, action) => {
                state.loading = false
                const newList = [...state.listRoom, ...action.payload]
                state.listRoom = newList
            })
    },
})

const { reducer, actions } = chatSlice

export const chatActions = Object.assign(actions, {
    getListRoom,
})

export default reducer
