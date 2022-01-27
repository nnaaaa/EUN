import { Avatar, Box, Button, Chip, Input, Stack, Typography,CircularProgress } from '@mui/material'
import SolarSystem from 'components/logo/2dSolarSystem'
import { useFindUserDebounce } from 'hooks/useSearchDebounce'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { IFriendPublicInfo } from 'states/slices/friendSlice'
import { searchActions } from 'states/slices/searchSlice'
import { ListMember, useStyle, Wrapper, WrapperInput } from './contentStyles'

interface IProps {
    // room: IChatRoom

}

function Content({}: IProps) {
    const style = useStyle()
    const user = useAppSelector((state) => state.user.current)
    const { current:listFriend,loading } = useAppSelector((state) => state.search)

    const inputRef = useRef<HTMLInputElement | null>(null)
    //tìm kiếm debouce
    const { getMore, isHasMore, getTheFirstTime } = useFindUserDebounce(
        inputRef,
        'friend'
    )
    const dispatch = useAppDispatch()
    const [members, setMembers] = useState<IFriendPublicInfo[]>([])
    const addMember = (friend: IFriendPublicInfo) => {
        dispatch(searchActions.clear())
        setMembers(pre => {
            // const isAdded = pre.some(member=>member._id === friend._id)
            // if (isAdded) return pre
            return pre.concat([friend])
        })
        if (inputRef && inputRef.current)
            inputRef.current.value = ''
    }
    const removeMember = (friend:IFriendPublicInfo) => {
        setMembers(pre=>pre.filter(member=>member._id !== friend._id))
    }

    if (!user) return <></>

    return (
        <>
            <Wrapper id="searchFriendScroll">
                <WrapperInput>
                    <Input
                        inputRef={inputRef}
                        onChange={getTheFirstTime}
                        fullWidth
                        endAdornment={loading ? <CircularProgress size='20px'/> : <></>}
                    />
                    {listFriend.length ? <InfiniteScroll
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
                                onClick={()=>addMember(friend)}
                                fullWidth
                            >
                                <Stack direction="row" alignItems="center" width="100%">
                                    <Avatar src={friend.avatar} />

                                    <Box ml={1} overflow="hidden">
                                        <Typography
                                            className={style.name}
                                            align="left"
                                            noWrap
                                            width="100%"
                                        >
                                            {friend.username}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Button>
                        ))}
                    </InfiniteScroll> : <></>}
                </WrapperInput>
                <ListMember>
                    {members.map((member) => (
                        <Chip
                            avatar={<Avatar src={member.avatar}/>}
                            key={'member' + member._id}
                            label={member.username}
                            className={style.chip}
                            onDelete={()=>removeMember(member)}
                        />
                    ))}
                </ListMember>
            </Wrapper>
        </>
    )
}

export default Content
