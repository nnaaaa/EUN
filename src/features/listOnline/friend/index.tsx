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
import { useStyle } from 'features/listOnline/listOnlineStyles'
import { ID } from 'models/common'
import { useState } from 'react'
import { useAppSelector } from 'states/hooks'
import { useToggleChat } from '../../chatRoomList/listChat/useToggleChat'
import { arrayIsContain } from 'algorithms/array'
import className from './styles.module.scss'

export default function FriendOnline() {
    const style = useStyle()
    const [expand, setExpand] = useState(true)
    const { listRoom } = useAppSelector((state) => state.chat)
    const user = useAppSelector((state) => state.user.current)
    const friendOnlineList = useAppSelector((state) => {
        return state.user.current
            ? state.user.current.friends?.accepted.filter((f) => f.isOnline)
            : []
    })
    const { loading } = useAppSelector((state) => state.chat)

    // ẩn hoặc hiện khung chat khi nhấn vào các người online
    const toggleChat = useToggleChat()
    const chatWithFriend = async (friendId: ID) => {
        if (!user) return
        const room = listRoom.find((room) => {
            const listId = room.members.map((u) => u._id)
            return arrayIsContain(listId, user._id, friendId)
        })
        if (room) {
            await toggleChat(room._id)
        }
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
                    ✅ Bạn bè đang trực tuyến
                </Typography>
                {loading && <CircularProgress size={20} />}
            </AccordionSummary>
            <AccordionDetails className={style.accorDetail}>
                {friendOnlineList.map((friend, index) => (
                    <Button
                        className={style.wrapper}
                        color="primary"
                        key={'listOnline' + index}
                        onClick={() => chatWithFriend(friend._id)}
                        fullWidth
                    >
                        <Stack direction="row" alignItems="center" width="100%">
                            <Box className={className.aura}>
                                <Avatar src={friend.avatar} />
                            </Box>
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
            </AccordionDetails>
        </Accordion>
    )
}
