import { Box, Fab } from '@mui/material'
import Chat from 'features/chatRoom/chat'
import { Wrapper, WrapperCreateRoom } from 'features/chatRoom/listChat/listChatStyles'
import { useAppSelector } from 'states/hooks'
import EditIcon from '@mui/icons-material/Edit';
import CreateRoom from '../createRoom';
import { useState } from 'react';

const ListChat = () => {
    const currentWindow = useAppSelector((state) => state.chat.currentWindow)
    const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false)

    return (
        <Wrapper>
            <WrapperCreateRoom>
                <Fab sx={{ position: 'absolute', top: '50%', left:'50%',transform:'translate(-50%,-50%)' }} onClick={()=>setIsOpenCreateRoom(true)}>
                    <EditIcon/>
                </Fab>
            </WrapperCreateRoom>
            <CreateRoom isOpen={isOpenCreateRoom} setIsOpen={setIsOpenCreateRoom}/>
            {currentWindow.map((room, index) => (
                <Chat key={'roomChat' + index} {...room} />
            ))}
        </Wrapper>
    )
}

export default ListChat
