import { notificationAPI } from 'api/rest/list/notification'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chatAPI } from 'api/rest'
import { IChatRoom } from 'models/chatRoom'
import { ID, IQueryPost } from 'models/index'
import { IMessage } from 'models/message'
import { RootState } from 'states/store'
import { INotification } from 'models/notification'

interface IinitalState {
    loading: boolean
    error?: string
    current: INotification[]
}

const initialState: IinitalState = {
    loading: false,
    current: [],
}
const getListFromTime = createAsyncThunk(
    'chat/getListNoticeFromTime',
    async (args: Partial<IQueryPost> & { fromTime: Date }) => {
        const { _limit, fromTime } = args
        const res = await notificationAPI.getListFromTime({ _limit }, fromTime)
        if (!res.data || res.data.length === 0) throw new Error('No more notification')
        return res.data
    }
)

const notificationSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addOrUpdate(state, action: PayloadAction<INotification>) {
            const notification = action.payload
            let isExisted = false
            state.current = state.current.map((n) => {
                if (n._id === notification._id) {
                    isExisted = true
                    return { ...n, ...notification }
                }
                return n
            })
            if (!isExisted) state.current.unshift(notification)
        },
        delete(state, action: PayloadAction<ID>) {
            state.current = state.current.filter((n) => n._id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListFromTime.pending, (state) => {
                state.loading = true
            })
            .addCase(getListFromTime.rejected, (state) => {
                state.error = 'Unauthorized'
                state.loading = false
            })
            .addCase(getListFromTime.fulfilled, (state, action) => {
                state.current = state.current.concat(action.payload)
                state.loading = false
            })
    },
})

const { reducer, actions } = notificationSlice

export const notificationActions = Object.assign(actions, {
    getListFromTime,
})

export default reducer
