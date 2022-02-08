import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { chatAPI } from 'api/rest'
import DisplayGridImages from 'components/images/output2'
import { FACEBOOK_DB } from 'config/keys'
import { IMessage } from 'models/message'
import { IPublicInfo } from 'models/user'
import moment from 'moment'
import { useContext, useState } from 'react'
import { SocketContext } from 'states/context/socket'
import { socialUrlReg } from 'utils/regex'
import {
    FriendMessage,
    FriendMessageWrap,
    MyMessage,
    MyMessageWrap,
    TextContent,
} from './styles'

interface IMessageProps {
    message: IMessage
    user: IPublicInfo
}

const Message = ({ message, user }: IMessageProps) => {
    const time = moment(message.createAt.toString()).calendar()
    const isUrl = socialUrlReg.test(message.content)
    let content = <TextContent>{message.content}</TextContent>
    const { socket } = useContext(SocketContext)
    const [isHover, setIsHover] = useState(false)

    const removeMessage = async (message: IMessage) => {
        try {
            if (!socket) return
            const { sent, _id, chatRoom } = message
            socket.emit(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.chatRooms}/deleteMessage`,
                sent,
                chatRoom,
                _id
            )
            await chatAPI.deleteMessage(message)
        } catch (e) {
            console.log(e)
        }
    }

    if (isUrl)
        content = (
            <LinkPreview
                imageHeight={100}
                url={message.content}
                descriptionLength={20}
                fallback={<TextContent>{message.content}</TextContent>}
            />
        )
    if (message.owner._id === user._id) {
        return (
            <MyMessageWrap
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
                    onClick={() => removeMessage(message)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>

                <Tooltip title={time} placement="left">
                    <MyMessage>
                        {content}
                        <DisplayGridImages
                            images={message.images as string[]}
                            title={message.content}
                        />
                    </MyMessage>
                </Tooltip>
            </MyMessageWrap>
        )
    }
    return (
        <FriendMessageWrap>
            <Tooltip title={message.owner.username} placement="left">
                <Avatar
                    src={message.owner.avatar}
                    sx={{ width: 32, height: 32, mr: 1 }}
                />
            </Tooltip>
            <Tooltip title={time} placement="right">
                <FriendMessage>
                    {content}
                    <DisplayGridImages
                        images={message.images as string[]}
                        title={message.content}
                    />
                </FriendMessage>
            </Tooltip>
        </FriendMessageWrap>
    )
}

export default Message
