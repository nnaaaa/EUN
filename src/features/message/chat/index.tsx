import { Box } from '@mui/material'
import { IChatRoom } from 'models/chatRoom'
import React, { useState } from 'react'
import Content from './content'
import Footer from './footer'
import Header from './header'

interface IChat {}

function Chat(props: IChatRoom) {
    const [expand, setExpand] = useState(true)
    // useWatchDoc('rooms', id, dispatch, Actions.updateMessages)

    return (
        <Box
            bgcolor="white"
            boxShadow={2}
            mr={1}
            borderRadius={2}
            width="20rem"
        >
            <Header room={props} setExpand={setExpand} />
            {expand && <Content room={props} />}
            {expand && <Footer room={props}/>}
        </Box>
    )
}

export default React.memo(Chat)
