import { Box } from '@mui/material'
import { useMessageSocket } from 'api/socket/message'
import { IChatRoom } from 'models/chatRoom'
import React, { useState } from 'react'
import Content from './content'
import Footer from './footer'
import Header from './header'
import { useComposing } from './useComposing'

function Chat(props: IChatRoom) {
    const [expand, setExpand] = useState(true)
    const { onBlur, onFocus, userComposingId } = useComposing(props)

    return (
        <Box
            bgcolor="white"
            boxShadow={2}
            mr={1}
            borderRadius={2}
            width="20rem"
            position="relative"
        >
            <Header room={props} setExpand={setExpand} />
            {expand && <Content room={props} userComposingId={userComposingId} />}
            {expand && <Footer room={props} onBlur={onBlur} onFocus={onFocus} />}
        </Box>
    )
}

export default React.memo(Chat)
