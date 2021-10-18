import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit'
import chatReducer from 'states/slices/chatSlice'
import authReducer from 'states/slices/authSlice'
import userReducer from 'states/slices/userSlice'
import friendReducer from 'states/slices/friendSlice'
import searchReducer from 'features/searchForm/searchSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    friend: friendReducer,
    search: searchReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat([]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
