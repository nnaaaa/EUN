import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ConversationLoading } from './styles'
import useIteratorChatRoom from './useIteratorChatRoom'
import VirtualRoom from './virtualRoom'

interface IConversationProps {
    iteratorHook: ReturnType<typeof useIteratorChatRoom>
    closeConverse: () => void
}

const Conversation = ({ iteratorHook, closeConverse }: IConversationProps) => {
    const { user, listRoom, getMore, isHasMore } = iteratorHook

    if (!user || !listRoom || listRoom.length === 0)
        return (
            <Box
                boxShadow={2}
                bgcolor="white"
                width="300px"
                p={1}
            >
                <Typography>Không có tin nhắn nào</Typography>
            </Box>
        )

    return (
        <Box
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
                loader={<ConversationLoading />}
                scrollableTarget="wrapperScroll"
            >
                {listRoom.map((room, idx) => (
                    <VirtualRoom
                        key={'virtualRoom' + idx}
                        room={room}
                        user={user}
                        closeConverse={closeConverse}
                    />
                ))}
            </InfiniteScroll>
        </Box>
    )
}

export default Conversation
