import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Fab, Grow, Stack } from '@mui/material'
import SolarSystem from 'components/logo/2dSolarSystem'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/common'
import { IPublicInfo } from 'models/user'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppSelector } from 'states/hooks'
import useChatIterator from '../useChatIterator'
import { FriendComposing, WrapperMessage } from './contentStyles'
import Message from './message'
import useScroll from './useScroll'

interface IProps {
    room: IChatRoom
    userComposingId: ID | null | undefined
    user: IPublicInfo
}

function Content({ room, userComposingId,user }: IProps) {
    const { messages } = room
    const { getMore, isHasMore } = useChatIterator(room)
    const { infiniteScrollRef, isDisplayScrollButton, onScroll, scrollToBottom } =
        useScroll(messages)


    return (
        <>
            <WrapperMessage id="messageScroll">
                {userComposingId && userComposingId !== user._id && <FriendComposing />}

                <InfiniteScroll
                    ref={infiniteScrollRef as any}
                    onScroll={onScroll}
                    dataLength={messages.length}
                    next={getMore}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    inverse={true}
                    hasMore={isHasMore}
                    loader={
                        <Stack
                            width="100%"
                            height="100px"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <SolarSystem />
                        </Stack>
                    }
                    scrollableTarget="messageScroll"
                >
                    {messages.map((message) => (
                        <Message key={message._id} message={message} user={user} />
                    ))}
                </InfiniteScroll>
            </WrapperMessage>

            <Grow in={isDisplayScrollButton}>
                <Fab
                    size="small"
                    sx={{ position: 'absolute', bottom: 50, right: 20 }}
                    onClick={scrollToBottom}
                >
                    <KeyboardArrowDownIcon />
                </Fab>
            </Grow>
        </>
    )
}

export default Content
