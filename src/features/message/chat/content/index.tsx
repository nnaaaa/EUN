import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { faEllipsisH, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Popover, Tooltip } from '@mui/material'
import { chatAPI } from 'api/rest'
import DisplayGridImages from 'components/images/output2'
import { FACEBOOK_DB } from 'config/keys'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/common'
import { IMessage } from 'models/message'
import moment from 'moment'
import { useContext, useEffect, useRef,useState } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import { socialUrlReg } from 'utils/regex'
import {
    FriendComposing,
    FriendMessage,
    MyMessage,
    MyMessageWrap,
    TextContent,
    WrapperMessage
} from './contentStyles'


interface IProps {
    room: IChatRoom
    userComposingId: ID | null | undefined
}

function Content({ room,userComposingId }: IProps) {
    const { messages } = room
    const { socket } = useContext(SocketContext)
    const user = useAppSelector((state) => state.user.current)
    const heightOfChatWrapper = useRef<null | HTMLDivElement>(null)

    const [isHover, setIsHover] = useState(false)

    const removeMessage = async (message:IMessage) => {
        if (!socket) return
        const { chatRoom,_id } = message
        socket.emit(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/deleteMessage`,
            chatRoom,
            _id
        )
        await chatAPI.deleteMessage(message)
    }

    //scroll xuống khi vừa mở khung chat hoặc có tin nhắn mới
    useEffect(() => {
        if (!heightOfChatWrapper.current) return
        //vừa mở khung chat hoặc vừa cập nhật messages -> scroll
        heightOfChatWrapper.current.scroll({
            top: heightOfChatWrapper.current.scrollHeight,
            behavior: 'smooth',
        })
    }, [room])

    if (!user) return <></>

    return (
        <WrapperMessage ref={heightOfChatWrapper}>
            {messages.map((msg) => {
                const time = moment(msg.createAt.toString()).calendar()
                const isUrl = socialUrlReg.test(msg.content)
                let content = <TextContent>{msg.content}</TextContent>
                if (isUrl)
                    content = (
                        <LinkPreview
                            imageHeight={100}
                            url={msg.content}
                            descriptionLength={20}
                            fallback={<TextContent>{msg.content}</TextContent>}
                        />
                    )
                if (msg.owner === user._id) {
                    return (
                        <MyMessageWrap
                            key={msg._id}
                            onMouseOver={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            <IconButton
                                sx={{
                                    alignSelf: 'center',
                                    mr: 1,
                                    visibility: isHover ? 'initial' : 'hidden',
                                }}
                                color="primary"
                                size="small"
                                onClick={()=>removeMessage(msg)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>

                            <Tooltip title={time} placement="left">
                                <MyMessage>
                                    {content}
                                    <DisplayGridImages
                                        images={msg.images as string[]}
                                        title={msg.content}
                                    />
                                </MyMessage>
                            </Tooltip>
                        </MyMessageWrap>
                    )
                }
                return (
                    <Tooltip title={time} placement="right" key={msg._id}>
                        <FriendMessage>
                            {content}
                            <DisplayGridImages
                                images={msg.images as string[]}
                                title={msg.content}
                            />
                        </FriendMessage>
                    </Tooltip>
                )
            })}
            {userComposingId && userComposingId !== user._id && <FriendComposing />}
        </WrapperMessage>
    )
}

export default Content
