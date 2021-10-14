import { Box } from '@mui/material'
import { IChatRoom } from 'models/chatRoom'
import React, { FormEvent, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import Content from './content'
import Header from './header'
import Footer from './footer'


interface IChat {

}

function Chat(props: IChatRoom) {
    
    const user = useAppSelector((state) => state.user.current)
    const { messages, _id, members, composing } = props


    // useWatchDoc('rooms', id, dispatch, Actions.updateMessages)

    return (
        <Box bgcolor="white" boxShadow={2} mr={1} borderRadius={10} width="20rem">
            <Header {...props}/>
            <Content {...props} />
            <Footer/>
        </Box>
    )
}

export default React.memo(Chat)
