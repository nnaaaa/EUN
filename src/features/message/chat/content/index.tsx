import { Tooltip } from '@mui/material'
import DisplayGridImages from 'components/images/output2'
import { IChatRoom } from 'models/chatRoom'
import moment from 'moment'
import { useEffect, useRef } from 'react'
import { useAppSelector } from 'states/hooks'
import {
    FriendComposing,
    FriendMessage,
    MyMessage,
    TextContent,
    useStyle,
    WrapperMessage,
} from './contentStyles'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { socialUrlReg } from 'utils/regex'
interface IProps {
    room: IChatRoom
}

function Content({ room }: IProps) {
    const style = useStyle()
    const { messages, composing } = room
    const user = useAppSelector((state) => state.user.current)
    const heightOfChatWrapper = useRef<null | HTMLDivElement>(null)

    //scroll xuống khi vừa mở khung chat hoặc có tin nhắn mới
    useEffect(() => {
        if (!heightOfChatWrapper.current) return
        //vừa mở khung chat hoặc vừa cập nhật messages -> scroll
        heightOfChatWrapper.current.scroll({
            top: heightOfChatWrapper.current.scrollHeight,
            behavior: 'smooth',
        })
    }, [room])

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
                if (msg.owner === user?._id) {
                    return (
                        <Tooltip title={time} placement="left" key={msg._id}>
                            <MyMessage>
                                {content}
                                <DisplayGridImages
                                    images={msg.images as string[]}
                                    title={msg.content}
                                />
                            </MyMessage>
                        </Tooltip>
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
            {composing.length > 0 && <FriendComposing />}
        </WrapperMessage>
    )
}

export default Content
