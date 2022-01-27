import { Avatar, Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useToggleChat } from 'features/chatRoomList/useToggleChat'
import { ID } from 'models/common'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ConversationLoading, useStyle } from './styles'
import useIteratorChatRoom from './useIteratorChatRoom'

interface IConversationProps {
    iteratorHook: ReturnType<typeof useIteratorChatRoom>
    closeConverse: () => void
}

const Conversation = ({ iteratorHook, closeConverse }: IConversationProps) => {
    const { user, listRoom, getMore, isHasMore } = iteratorHook
    
    const style = useStyle()
    const toggleChat = useToggleChat()

    if (!user) return <></>

    return (
        <Box
            p={1}
            boxShadow={2}
            bgcolor="white"
            width="300px"
            height="200px"
            overflow="auto"
            id="wrapperScroll"
        >
            <InfiniteScroll
                dataLength={listRoom.length}
                next={getMore}
                hasMore={isHasMore}
                loader={<ConversationLoading/>}
                scrollableTarget="wrapperScroll"
            >
                {listRoom.map((room, idx) => {
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
                })}
            </InfiniteScroll>
        </Box>
    )
}

export default Conversation
