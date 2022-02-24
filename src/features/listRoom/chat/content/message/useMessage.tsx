import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { chatAPI } from 'api/rest'
import { FACEBOOK_DB } from 'config/keys'
import { IMessage } from 'models/message'
import moment from 'moment'
import { useContext } from 'react'
import { SocketContext } from 'states/context/socket'
import { socialUrlReg } from 'utils/regex'
import { TextContent } from './styles'

export const useMessage = (message: IMessage) => {
    const { socket } = useContext(SocketContext)
    const time = moment(message.createAt.toString()).calendar()
    const isUrl = socialUrlReg.test(message.content)

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

    return {
        removeMessage,
        time,
        content: isUrl ? (
            <LinkPreview
                imageHeight={100}
                url={message.content}
                descriptionLength={20}
                fallback={<TextContent>{message.content}</TextContent>}
            />
        ) : (
            <TextContent>{message.content}</TextContent>
        ),
    }
}
