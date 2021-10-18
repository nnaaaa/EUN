import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { arrayIsContain } from 'algorithms/array'
import { useStyle } from 'features/listOnline/listOnlineStyles'
import { ID } from 'models/Common'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'

export default function FriendOnline() {
    const style = useStyle()
    const [expand, setExpand] = useState(true)
    const friendOnlineList = useAppSelector((state) => {
        return state.user.current.friends?.accepted.filter((f) => f.isOnline)
    })
    const dispatch = useAppDispatch()
    const { current: listChat, loading } = useAppSelector((state) => state.chat)
    const user = useAppSelector(state=>state.user.current)

    // //ẩn hoặc hiện khung chat khi nhấn vào các người online
    const toggleChat = async (friendId: ID) => {
        if (loading) return

        if (!user._id) return
        
        if (listChat.find((room) => {
            const listId = room.members.map(u => u._id)
            return arrayIsContain(listId,user._id,friendId)
        }))
        {
            dispatch(chatActions.closeChat([user._id,friendId]));
            return;
        }
        await dispatch(chatActions.addChat(friendId))
    }

    if (!friendOnlineList || friendOnlineList.length <= 0) {
        return <></>
    }

    return (
        <Accordion
            className={style.accordion}
            expanded={expand}
            onChange={() => setExpand((pre) => !pre)}
        >
            <AccordionSummary
                expandIcon={<FontAwesomeIcon icon={faChevronDown} size="sm" />}
            >
                <Typography className={style.name} gutterBottom>
                    👩‍👧‍👧 Bạn bè đang trực tuyến
                </Typography>
                {loading && <CircularProgress size={20} />}
            </AccordionSummary>
            <AccordionDetails className={style.accorDetail}>
                {friendOnlineList.map((friend, index) => (
                    <Button
                        className={style.wrapper}
                        color="inherit"
                        key={'listOnline' + index}
                        onClick={() => toggleChat(friend._id)}
                    >
                        <Stack direction="row" alignItems="center">
                            <Avatar src={friend.avatar} />
                            <Box ml={1} overflow="hidden">
                                <Typography className={style.name} align="left">
                                    {friend.username}
                                </Typography>
                            </Box>
                        </Stack>
                    </Button>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}
