
import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from 'screens/authenticate/authSlice'

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat([])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>