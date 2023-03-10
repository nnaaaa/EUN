import { Box } from '@mui/material'
import { IChatRoom } from 'models/chatRoom'
import React, { useState } from 'react'
import { useAppSelector } from 'states/hooks'
import Content from './content'
import Footer from './footer'
import Header from './header'
import { useComposing } from './useComposing'

function Chat(props: IChatRoom) {
    const [expand, setExpand] = useState(true)
    const { onBlur, onFocus, userComposingId } = useComposing(props)
    const user = useAppSelector((state) => state.user.current)

    if (!user) return <></>

    return (
        <Box
            bgcolor="background.paper"
            boxShadow={2}
            mr={1}
            borderRadius={2}
            width="20rem"
            position="relative"
        >
            <Header room={props} setExpand={setExpand} user={user} />
            {expand && (
                <Content room={props} userComposingId={userComposingId} user={user} />
            )}
            {expand && <Footer room={props} onBlur={onBlur} onFocus={onFocus} />}
        </Box>
    )
}

export default React.memo(Chat)
