import { RootState } from 'states/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { filterSearch } from 'algorithms/filterSearch'
import { friendAPI } from 'api/rest'
import { IPublicInfo } from 'models/user'
import { IQueryPost } from 'models/common'



interface IinitialState {
    loading: boolean
    error?: string
    current: IPublicInfo[]
}

const initialState: IinitialState = {
    loading: false,
    current: [],
}

const findAllUserByName = createAsyncThunk(
    'search/findAllUserByName',
    async (args: { searchTarget: string, query: IQueryPost }, thunkAPI) => {
        const { query, searchTarget } = args
        const res = await friendAPI.findAllUserByName(query, searchTarget)
        if (!res.data || res.data.length === 0) throw new Error("No more user")
        const myInfo = (thunkAPI.getState() as RootState).user.current
        const filterData = filterSearch(res.data, myInfo)
        return filterData
    }
)
const findFriendByName = createAsyncThunk(
    'search/findFriendByName',
    async (args:{searchTarget:string,query:IQueryPost}, thunkAPI) => {
        const { query, searchTarget } = args
        const res = await friendAPI.findFriendByName(query,searchTarget)
        if (!res.data || res.data.length === 0) throw new Error("No more user")
        const myInfo = (thunkAPI.getState() as RootState).user.current
        const filterData = filterSearch(res.data, myInfo)
        return filterData
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateStore: (state, action: PayloadAction<IPublicInfo>) => {
            const userInfo = action.payload
            state.current = filterSearch(state.current, userInfo)
        },
        clear: (state) => {
            state.current = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllUserByName.pending, (state) => {
                state.loading = true
            })
            .addCase(findAllUserByName.rejected, (state) => {
                state.loading = false
                state.error = 'Gặp lỗi trong quá trình tìm kiếm'
            })
            .addCase(findAllUserByName.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.current = action.payload
            })
            .addCase(findFriendByName.pending, (state) => {
                state.loading = true
            })
            .addCase(findFriendByName.rejected, (state) => {
                state.loading = false
                state.error = 'Gặp lỗi trong quá trình tìm kiếm'
            })
            .addCase(findFriendByName.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.current = action.payload
            })
    },
})

const { actions, reducer } = searchSlice
export const searchActions = Object.assign(actions, {
    findAllUserByName,
    findFriendByName
})
export default reducer
