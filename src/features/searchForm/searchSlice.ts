import { RootState } from 'states/store';
import {
    createAsyncThunk,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'
import { filterSearch } from 'algorithms/filterSearch'
import { friendAPI } from 'api/rest'
import { IPublicInfo } from 'models/user'

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

const getResult = createAsyncThunk('search/getResult', async (searchTarget: string,thunkAPI) => {
    const res = await friendAPI.findByName(searchTarget)
    const myInfo = (thunkAPI.getState() as RootState).user.current
    const filterData = filterSearch(res.data,myInfo)
    return filterData
})

const friendSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateStore: (state, action:PayloadAction<Partial<IPublicInfo>>) => {
            const userInfo = action.payload
            state.current = filterSearch(state.current,userInfo)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getResult.pending, (state) => {
            state.loading = true
            })
            .addCase(getResult.rejected, (state) => {
                state.loading = false
                state.error = 'Gặp lỗi trong quá trình tìm kiếm'
            })
            .addCase(getResult.fulfilled, (state, action) => {
                state.loading = false
                state.current = action.payload
            })
    }

})

const { actions, reducer } = friendSlice
export const searchActions = Object.assign(actions, {
    getResult
})
export default reducer
