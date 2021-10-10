import { IChatRoom } from 'models/chatRoom';
import { createSlice } from '@reduxjs/toolkit';


const initialState: IChatRoom[] = []

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{},
})


export const { reducer, actions } = chatSlice

export default reducer