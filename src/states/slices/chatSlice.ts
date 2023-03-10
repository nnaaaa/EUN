import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chatAPI } from 'api/rest'
import { IChatRoom } from 'models/chatRoom'
import { ID, IQueryPost } from 'models/index'
import { IMessage } from 'models/message'
import { IReact } from 'models/react'
import { RootState } from 'states/store'

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

const addWindowChatAsync = createAsyncThunk(
    'chat/addWindowChat',
    async (room: IChatRoom, thunkAPI) => {
        const currentWindow = (thunkAPI.getState() as RootState).chat.currentWindow
        if (currentWindow.find((r) => r._id === room._id)) {
            thunkAPI.dispatch(chatActions.closeWindowChat(room._id))
            return
        }
        await chatAPI.seenMessages(room._id)
        return room
    }
)

const getListRoomFromTime = createAsyncThunk(
    'chat/getListRoomFromTime',
    async (args: Partial<IQueryPost> & { fromTime: Date }) => {
        const { _limit, fromTime } = args
        const res = await chatAPI.getListRoomFromTime({ _limit }, fromTime)
        if (!res.data || res.data.length === 0) throw new Error('No more room')
        return res.data
    }
)
const getNewestRoom = createAsyncThunk('chat/getNewestRoom', async () => {
    const res = await chatAPI.getListRoomFromTime({ _limit: 1 }, new Date())
    return res.data
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addWindowChat(state, action: PayloadAction<IChatRoom>) {
            const room = action.payload
            state.currentWindow.push(room)
        },
        closeWindowChat(state, action: PayloadAction<ID>) {
            state.currentWindow = state.currentWindow.filter(
                (room) => room._id !== action.payload
            )
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
            const room = state.listRoom.find((r) => r._id === message.chatRoom)
            if (!room) return
            room.messages.unshift(message)
            state.listRoom = state.listRoom.filter((r) => r._id !== message.chatRoom)
            state.listRoom.unshift(room)

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

        addOrUpdateReactToPost(
            state,
            action: PayloadAction<{ react: IReact; possessId: ID }>
        ) {
            const { react, possessId } = action.payload
            state.currentWindow = state.currentWindow.map((room) => {
                room.messages = room.messages.map((message) => {
                    if (message._id === possessId) {
                        const isReacted = message.reacts.find((r) => r._id === react._id)
                        if (isReacted) {
                            const updatedReacts = message.reacts.map((r) =>
                                r._id === react._id ? react : r
                            )
                            return { ...message, reacts: updatedReacts }
                        }
                        // nếu react chưa từng tồn tại thì thêm vào
                        else {
                            message.reacts.push(react)
                            return message
                        }
                    }
                    return message
                })
                return room
            })
        },
        deleteReactFromPost(
            state,
            action: PayloadAction<{ reactId: ID; possessId: ID }>
        ) {
            const { reactId, possessId } = action.payload
            state.currentWindow = state.currentWindow.map((room) => {
                room.messages = room.messages.map((message) => {
                    if (message._id === possessId) {
                        message.reacts = message.reacts.filter((r) => r._id !== reactId)
                    }
                    return message
                })
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
            .addCase(getListRoomFromTime.pending, (state) => {
                state.loading = true
            })
            .addCase(getListRoomFromTime.rejected, (state) => {
                state.error = 'Unauthorized'
                state.loading = false
            })
            .addCase(getListRoomFromTime.fulfilled, (state, action) => {
                state.listRoom = state.listRoom.concat(action.payload)
                state.loading = false
            })
            .addCase(getNewestRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(getNewestRoom.rejected, (state) => {
                state.error = 'Room is not found'
                state.loading = false
            })
            .addCase(getNewestRoom.fulfilled, (state, action) => {
                state.listRoom = action.payload.concat(state.listRoom)
                state.loading = false
            })
            .addCase(addWindowChatAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(addWindowChatAsync.rejected, (state) => {
                state.error = 'Window chat is not found'
                state.loading = false
            })
            .addCase(addWindowChatAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.currentWindow.push(action.payload)
                }
                state.loading = false
            })
    },
})

const { reducer, actions } = chatSlice

export const chatActions = Object.assign(actions, {
    getListRoomFromTime,
    getNewestRoom,
    addWindowChatAsync,
})

export default reducer
