import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import chatReducer from 'states/slices/chatSlice'
import authReducer from 'screens/authenticate/authSlice'
import userReducer from 'states/slices/userSlice'
import friendReducer from 'states/slices/friendSlice'
import searchReducer from 'states/slices/searchSlice'
import postReducer from 'states/slices/postSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    friend: friendReducer,
    search: searchReducer,
    post: postReducer,
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
