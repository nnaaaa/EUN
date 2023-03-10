import { Box, CircularProgress, Typography } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppSelector } from 'states/hooks'
import PostNotification from './notification/post'
import CommentNotification from './notification/comment'
import AddFriendNotification from './notification/addFriend'

import { NotificationLoading } from './styles'
import useNotificationIterator from './useNotificationIterator'

interface INotificationListProps {
    iteratorHook: ReturnType<typeof useNotificationIterator>
    closeNotification: () => void
}

const NotificationList = ({ iteratorHook }: INotificationListProps) => {
    const { getMore, isHasMore } = iteratorHook
    const { loading, error, current } = useAppSelector((state) => state.notification)

    if (!current || current.length === 0)
        return (
            <Box boxShadow={2} bgcolor="background.paper" width="100%" p={1}>
                <Typography>Không có thông báo nào</Typography>
            </Box>
        )

    return (
        <Box
            boxShadow={2}
            bgcolor="background.paper"
            maxHeight="400px"
            width="300px"
            overflow="auto"
            id="wrapperScroll"
        >
            <InfiniteScroll
                dataLength={current.length}
                next={getMore}
                hasMore={isHasMore}
                loader={<NotificationLoading />}
                scrollableTarget="wrapperScroll"
            >
                {current.map((notification) => {
                    const { title } = notification
                    if (title.includes('comment on post'))
                        return (
                            <PostNotification
                                key={notification._id}
                                notification={notification}
                            />
                        )
                    else if (title.includes('reply on comment'))
                        return (
                            <CommentNotification
                                key={notification._id}
                                notification={notification}
                            />
                        )
                    else if (title.includes('add friend'))
                        return (
                            <AddFriendNotification
                                key={notification._id}
                                notification={notification}
                            />
                        )
                })}
            </InfiniteScroll>
        </Box>
    )
}

export default NotificationList
{
    /* {current.length ? (
                current?.map((user) => (
                    <Box
                        mb={1}
                        display="flex"
                        alignItems="center"
                        width="280px"
                        key={'notice' + user._id}
                    >
                        <Box>
                            <Avatar src={user.avatar} />
                        </Box>
                        <Box mx={1} overflow="hidden" width="70%">
                            <Typography
                                color="textPrimary"
                                className={style.name}
                            >
                                {user.username}
                            </Typography>
                            <Typography color="textSecondary" noWrap={true}>
                                send you an invition
                            </Typography>
                        </Box>
                        <Button
                            onClick={() => dispatch(friendActions.acceptInvite(user._id))}
                            variant="outlined"
                            color="primary"
                            size="small"
                        >
                            accept
                        </Button>
                    </Box>
                ))
            ) : (
                <Typography>😓 Không có thông báo nào</Typography>
            )} */
}
{
    /* <Typography>😓 Không có thông báo nào</Typography> */
}
