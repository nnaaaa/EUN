import { Stack } from '@mui/material'
import SolarSystem from 'components/logo/2dSolarSystem'
import { IPublicInfo } from 'models/user'
import { useEffect, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppSelector } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'
import Private from './getStrategy/private'
import PublicFriend from './getStrategy/publicAndFriend'
import Post from './post'
import useIteratorPost from './useIteratorPost'

interface IListPostProps {
    mode: 'publicAndFriend' | 'private'
    user: IPublicInfo
}

export default function ListPost({ mode, user }: IListPostProps) {
    const { current } = useAppSelector((state) => state.post)

    const getStrategy = useMemo(() => {
        if (mode === 'private') return new Private(user)
        else return new PublicFriend(user)
    }, [user])
    const { getMore, isHasMore,dispatch } = useIteratorPost(getStrategy)

    //load data at first time
    useEffect(() => {
        dispatch(postActions.clear());
        (async () => {
            await getMore()
        })()
            .then(() => {})
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {})
    }, [])

    return (
        <InfiniteScroll
            dataLength={current.length}
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
        >
            {current.map((post) => (
                <Post key={post._id} {...post} />
            ))}
        </InfiniteScroll>
    )
}
