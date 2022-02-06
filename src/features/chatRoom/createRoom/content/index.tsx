import { Button, CircularProgress, Input } from '@mui/material'
import { useFindUserDebounce as useFindDebounce } from 'hooks/useSearchDebounce'
import { Dispatch, SetStateAction, useRef } from 'react'
import { useAppSelector } from 'states/hooks'
import useCreateRoom from '../useCreateRoom'
import { CreateWrapper, MemberWrapper, WrapperInput } from './contentStyles'
import ListMember from './listMember'
import ListResult from './listResult'

interface IProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

function Content({ setIsOpen }: IProps) {
    const user = useAppSelector((state) => state.user.current)
    const { current: listFriend, loading } = useAppSelector((state) => state.search)

    const inputRef = useRef<HTMLInputElement | null>(null)
    //tìm kiếm debouce
    const { getMore, isHasMore, getTheFirstTime } = useFindDebounce(inputRef, 'friend')
    const { addMember, removeMember, members, createRoom } = useCreateRoom(inputRef)

    if (!user) return <></>

    return (
        <>
            <MemberWrapper id="searchFriendScroll">
                <WrapperInput>
                    <Input
                        placeholder="find your friend"
                        inputRef={inputRef}
                        onChange={getTheFirstTime}
                        fullWidth
                        endAdornment={loading ? <CircularProgress size="20px" /> : <></>}
                    />
                    <ListResult
                        getMore={getMore}
                        isHasMore={isHasMore}
                        addMember={addMember}
                    />
                </WrapperInput>
                <ListMember members={members} removeMember={removeMember} />
            </MemberWrapper>
            <CreateWrapper>
                <Button
                    sx={{ textTransform: 'initial', color: 'white' }}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={async () => {
                        await createRoom()
                        setIsOpen(false)
                    }}
                >
                    Create
                </Button>
            </CreateWrapper>
        </>
    )
}

export default Content
