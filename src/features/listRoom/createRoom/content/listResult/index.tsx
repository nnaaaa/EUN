import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import SolarSystem from 'components/logo/2dSolarSystem'
import { IPublicInfo } from 'models/user'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppSelector } from 'states/hooks'
import { useStyle } from './styles'

interface IListResultProps {
    getMore: () => Promise<void>
    addMember: (member: IPublicInfo) => void
    isHasMore: boolean
}

function ListResult({ getMore, isHasMore, addMember }: IListResultProps) {
    const style = useStyle()
    const { current: listFriend } = useAppSelector((state) => state.search)

    if (listFriend.length === 0) return <></>

    return (
        <InfiniteScroll
            dataLength={listFriend.length}
            next={getMore}
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
            scrollableTarget="searchFriendScroll"
        >
            {listFriend.map((friend) => (
                <Button
                    className={style.wrapper}
                    color="primary"
                    key={'searchFriend' + friend._id}
                    onClick={() => addMember(friend)}
                    fullWidth
                >
                    <Stack direction="row" alignItems="center" width="100%">
                        <Avatar src={friend.avatar} />

                        <Stack ml={1} overflow="hidden">
                            <Typography
                                fontWeight="bold"
                                variant="body2"
                                color="textPrimary"
                                align="left"
                                noWrap
                                width="100%"
                            >
                                {friend.username}
                            </Typography>
                            <Typography
                                fontWeight="bold"
                                color="textSecondary"
                                variant="caption"
                                align="left"
                                noWrap
                                width="100%"
                            >
                                {friend.account}
                            </Typography>
                        </Stack>
                    </Stack>
                </Button>
            ))}
        </InfiniteScroll>
    )
}

export default ListResult
