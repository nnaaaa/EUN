import React from 'react'
import Chat from 'features/message/chat'
import { useSelector } from 'react-redux'
import { Wrapper } from 'features/message/listChat/listChatStyles'
import { useAppSelector } from 'states/hooks'

const ListChat = () => {
    const listChat = useAppSelector((state) => state.chat)
    return (
        <Wrapper>
            {listChat.map((room, index) => (
                <Chat key={'roomChat' + index} {...room} />
            ))}
        </Wrapper>
    )
}

export default ListChat