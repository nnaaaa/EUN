import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    unwrapResult,
} from '@reduxjs/toolkit'
import { filterSearch } from 'algorithms/filterSearch'
import { friendAPI } from 'api/rest'
import { IPublicInfo } from 'models/user'
import { AppThunk } from './../store'

export type IFriendRole = 'accepted' | 'invited' | 'pending' | 'stranger'

export type IFriendPublicInfo = IPublicInfo & { role: IFriendRole }

interface IinitialState {
    loading: boolean
    error?: string
    current: IFriendPublicInfo[]
}

const initialState: IinitialState = {
    loading: false,
    current: [],
}

export const acceptInvite = createAsyncThunk(
    'friend/acceptInvite',
    async (friendId: string) => {
        await friendAPI.acceptInvite(friendId)
    }
)
export const addFriend = createAsyncThunk(
    'friend/addFriend',
    async (friendId: string) => {
        await friendAPI.addFriend(friendId)
    }
)

export const getListUser = createAsyncThunk(
    'friend/getListFriend',
    async (name: string) => {
        const response = await friendAPI.findByName(name)
        return response.data
    }
)

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        findByNameSuccess: (
            state,
            action: PayloadAction<IFriendPublicInfo[]>
        ) => {
            state.current = action.payload
        },
        updateRole: (state, action: PayloadAction<IPublicInfo>) => {
            const filterData = filterSearch(state.current, action.payload)
            state.current.length = 0
            state.current = filterData
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(acceptInvite.pending, (state) => {
                state.loading = true
            })
            .addCase(acceptInvite.rejected, (state) => {
                state.loading = false
                state.error = 'Load fail'
            })
            .addCase(acceptInvite.fulfilled, (state) => {
                state.loading = false
            })

            .addCase(addFriend.pending, (state) => {
                state.loading = true
            })
            .addCase(addFriend.rejected, (state) => {
                state.loading = false
                state.error = 'Load fail'
            })
            .addCase(addFriend.fulfilled, (state) => {
                state.loading = false
            })

            .addCase(getListUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getListUser.rejected, (state) => {
                state.loading = false
                state.error = 'Load fail'
            })
            .addCase(getListUser.fulfilled, (state) => {
                state.loading = false
            })
    },
})

export const findByName =
    (name: string): AppThunk =>
    async (dispatch, getState) => {
        try {
            const listUser = unwrapResult(await dispatch(getListUser(name)))
            const myInfo = getState().user.current
            const filterData = filterSearch(listUser, myInfo)
            dispatch(actions.findByNameSuccess(filterData))
        } catch {
            console.error('Fail to find by name')
        }
    }

export const { actions, reducer } = friendSlice
export default reducer
