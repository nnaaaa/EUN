import { Box } from '@mui/material'
import { IChatRoom } from 'models/chatRoom'
import React, { SetStateAction, useState ,Dispatch} from 'react'
import Content from './content'
import Footer from './footer'
import Header from './header'

interface ICreateRoomProps{
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

function CreateRoom({isOpen,setIsOpen}: ICreateRoomProps) {
    // const { onBlur, onFocus, userComposingId } = useComposing(props)

    if (!isOpen) return <></>

    return (
        <Box
            bgcolor="white"
            boxShadow={2}
            mr={1}
            borderRadius={2}
            width="20rem"
            position="relative"
        >
            <Header setIsOpen={setIsOpen}/>
            <Content/>
            <Footer/>
        </Box>
    )
}

export default CreateRoom
