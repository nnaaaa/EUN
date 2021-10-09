import React from 'react'
import Chat from 'features/message/chat/chat'
import {useSelector} from 'react-redux'
import {Wrapper} from 'features/message/listChat/listChatStyles'

const ListChat = () => {
  const listChat = useSelector((state) => state.chat)
  return (
    <Wrapper>
      {listChat.map((room, index) => (
        <Chat
          key={index}
          name={room.name}
          messages={room.messages}
          avatar={room.avatar}
          composing={room.composing}
          id={room.id}
          uid={room.uid}
        />
      ))}
    </Wrapper>
  )
}

export default ListChat
