import { Avatar, Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useToggleChat } from 'features/chatRoomList/listChat/useToggleChat'
import { ID } from 'models/common'
import moment from 'moment'
import { ConversationLoading, useStyle } from './styles'
import useConversation from './useConversation'

interface IConversationProps {
    converseHook: ReturnType<typeof useConversation>
    closeConverse: () => void
}

const Conversation = ({ converseHook, closeConverse }: IConversationProps) => {
    const { isLoading, chatRoomList, user } = converseHook
    const style = useStyle()
    const toggleChat = useToggleChat()

    if (!user || isLoading) return <ConversationLoading />

    return (
        <Box p={1} boxShadow={2} bgcolor="white" width="300px">
            {chatRoomList.length > 0 ? (
                chatRoomList.map((room, idx) => {
                    const friend = room.members.find((m) => m._id !== user._id)
                    const representMessage = room.messages[0]
                    const newMessageAt = moment(room.newMessageAt).fromNow(true)
                    let isSeenByMe
                    let isOwner = false
                    if (representMessage) {
                        isSeenByMe = (representMessage.seen as ID[]).find(
                            (id) => id === user._id
                        )
                        isOwner = representMessage.owner === user._id
                    }

                    if (!friend) return <></>
                    return (
                        <Button
                            className={style.wrapper}
                            color="primary"
                            key={'conversation' + idx}
                            onClick={async () => {
                                closeConverse()
                                await toggleChat(room._id)
                            }}
                            sx={{ textTransform: 'initial' }}
                            fullWidth
                        >
                            <Stack direction="row" alignItems="center" width="100%">
                                <Avatar src={friend.avatar} />
                                <Stack ml={1} overflow="hidden" width="100%">
                                    <Typography
                                        className={style.name}
                                        align="left"
                                        noWrap
                                    >
                                        {friend.username}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color={
                                            isSeenByMe || isOwner ? 'black' : 'primary'
                                        }
                                        noWrap
                                        textAlign="left"
                                    >
                                        {representMessage
                                            ? representMessage.content
                                            : 'Bắt đầu cuộc trò chuyện'}
                                    </Typography>
                                    {representMessage ? (
                                        <Typography
                                            variant="subtitle2"
                                            color="textSecondary"
                                            textAlign="left"
                                        >
                                            {newMessageAt}
                                        </Typography>
                                    ) : (
                                        <></>
                                    )}
                                </Stack>
                            </Stack>
                        </Button>
                    )
                })
            ) : (
                <Typography>😓 Không tin nhắn nào</Typography>
            )}
        </Box>
    )
}

export default Conversation
