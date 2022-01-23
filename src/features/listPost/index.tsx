import { IPost } from 'models/post'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import Post from './post'
import useIteratorPost from './post/useIteratorPost'
import { Stack, CircularProgress } from '@mui/material'

interface IListPostProps {
    posts?: IPost[]
}

export default function ListPost({ posts }: IListPostProps) {
    const dispatch = useAppDispatch()
    const { current } = useAppSelector((state) => state.post)
    const user = useAppSelector((state) => state.user.current)
    const { getMore, isHasMore } = useIteratorPost()

    //load data at first time
    useEffect(() => {
        ;(async () => {
            //nếu không truyền posts từ ngoài vào thì sẽ call api lấy tất cả post
            if (!posts && user) await getMore()
            else if (posts) {
            } else throw new Error()
        })()
            .then(() => {})
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {})
    }, [posts])

    if (posts)
        return (
            <>
                {posts.map((post) => (
                    <Post key={post._id} {...post} />
                ))}
            </>
        )

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
                    <CircularProgress />
                </Stack>
            }
        >
            {current.map((post) => (
                <Post key={post._id} {...post} />
            ))}
        </InfiniteScroll>
    )
}
