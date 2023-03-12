import DeleteIcon from '@mui/icons-material/Delete'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { Avatar, IconButton, Stack, Tooltip } from '@mui/material'
import { useReactSocket } from 'api/socket-user/react'
import DisplayGridImages from 'components/images/output2'
import Popup from 'components/popup'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import EmojiCounter from 'features/listReact'
import ReactToMessage from 'features/listReact/strategies/reactToMessage'
import { useReacts } from 'hooks/useReactAndReply'
import { IMessage } from 'models/message'
import { IPublicInfo } from 'models/user'
import { useMemo, useState } from 'react'
import {
    FriendEmoji,
    FriendMessage,
    FriendMessageWrap,
    MyEmoji,
    MyMessage,
    MyMessageWrap,
} from './styles'
import className from './styles.module.scss'
import { useMessage } from './useMessage'

interface IMessageProps {
    message: IMessage
    user: IPublicInfo
}

const Message = ({ message, user }: IMessageProps) => {
    const { _id, reacts } = message
    const [isHover, setIsHover] = useState(false)
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false)
    const { removeMessage, time, content } = useMessage(message)
    const reactToMessage = useMemo(
        () => new ReactToMessage({ _id, reacts, participants: [] }),
        [message]
    )
    const sendReactLegacy = async (emoji: any) => {
        const e = emoji as { id: string; native: string }

        if (!e.id || !e.native) return
        await sendReact({ label: e.id, icon: e.native })
        setIsOpenEmojiPicker(false)
    }

    const { sendReact, reactCounter } = useReacts(reactToMessage)
    useReactSocket(reactToMessage)

    if (message.owner._id === user._id) {
        return (
            <MyMessageWrap
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <Stack
                    flexDirection="row"
                    sx={{
                        visibility: isHover ? 'initial' : 'hidden',
                        alignSelf: 'center',
                        mr: 1,
                    }}
                >
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => removeMessage(message)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        className={className.reactionButton}
                        color="primary"
                        size="small"
                        onClick={() => setIsOpenEmojiPicker(true)}
                    >
                        <SentimentSatisfiedAltIcon fontSize="small" />
                        {/* <Box className={className.reactionPicker}>
                            <EmojiPicker onSelect={sendReact} iconSize={18} />
                        </Box> */}
                    </IconButton>
                </Stack>

                <Tooltip title={time} placement="top">
                    <MyMessage>
                        {content}
                        <DisplayGridImages
                            images={message.images as string[]}
                            title={message.content}
                        />
                        <MyEmoji>
                            <EmojiCounter
                                reacts={reacts}
                                counter={reactCounter}
                                iconSize={12}
                            />
                        </MyEmoji>
                    </MyMessage>
                </Tooltip>
                <Popup
                    open={isOpenEmojiPicker}
                    onClose={() => setIsOpenEmojiPicker(false)}
                >
                    <Picker set="google" onSelect={sendReactLegacy} />
                </Popup>
            </MyMessageWrap>
        )
    }
    return (
        <FriendMessageWrap
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Tooltip title={message.owner.username} placement="left">
                <Avatar
                    src={message.owner.avatar}
                    sx={{ width: 32, height: 32, mr: 1 }}
                />
            </Tooltip>
            <Tooltip title={time} placement="top">
                <FriendMessage>
                    {content}
                    <DisplayGridImages
                        images={message.images as string[]}
                        title={message.content}
                    />
                    <FriendEmoji>
                        <EmojiCounter
                            reacts={reacts}
                            counter={reactCounter}
                            iconSize={12}
                        />
                    </FriendEmoji>
                </FriendMessage>
            </Tooltip>

            <Stack
                flexDirection="row"
                sx={{
                    visibility: isHover ? 'initial' : 'hidden',
                    alignSelf: 'center',
                    ml: 1,
                }}
            >
                <IconButton
                    size="small"
                    className={className.reactionButton}
                    onClick={() => setIsOpenEmojiPicker(true)}
                >
                    <SentimentSatisfiedAltIcon fontSize="small" />
                    {/* <Box className={className.reactionPicker}>
                        <EmojiPicker onSelect={sendReact} iconSize={18} />
                    </Box> */}
                </IconButton>
            </Stack>

            <Popup open={isOpenEmojiPicker} onClose={() => setIsOpenEmojiPicker(false)}>
                <Picker set="google" onSelect={sendReactLegacy} />
            </Popup>
        </FriendMessageWrap>
    )
}

export default Message
