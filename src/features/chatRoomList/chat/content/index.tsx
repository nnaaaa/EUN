import { CircularProgress, Stack } from '@mui/material'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/common'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppSelector } from 'states/hooks'
import useChatIterator from '../useChatIterator'
import { FriendComposing, WrapperMessage } from './contentStyles'
import Message from './message'
import SolarSystem from 'components/logo/2dSolarSystem'

interface IProps {
    room: IChatRoom
    userComposingId: ID | null | undefined
}

function Content({ room, userComposingId }: IProps) {
    const { messages } = room
    const user = useAppSelector((state) => state.user.current)
    const { getMore, isHasMore } = useChatIterator(room)

    if (!user) return <></>

    return (
        <WrapperMessage id="messageScroll">
            <InfiniteScroll
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
            {userComposingId && userComposingId !== user._id && <FriendComposing />}
        </WrapperMessage>
    )
}

export default Content
