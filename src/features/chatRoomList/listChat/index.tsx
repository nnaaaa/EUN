import Chat from 'features/chatRoomList/chat'
import { Wrapper } from 'features/chatRoomList/listChat/listChatStyles'
import { useAppSelector } from 'states/hooks'

const ListChat = () => {
    const currentWindow = useAppSelector((state) => state.chat.currentWindow)
    return (
        <Wrapper>
            {currentWindow.map((room, index) => (
                <Chat key={'roomChat' + index} {...room} />
            ))}
        </Wrapper>
    )
}

export default ListChat
