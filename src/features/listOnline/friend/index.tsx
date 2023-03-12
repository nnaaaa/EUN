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
import { useListUserSocket } from 'api/socket-user/user'
import { useStyle } from 'features/listOnline/listOnlineStyles'
import { useState } from 'react'
import { useAppSelector } from 'states/hooks'
import { useFindRoomByMembers, useToggleChat } from '../../listRoom/useToggleChat'

export default function FriendOnline() {
    const style = useStyle()
    const [expand, setExpand] = useState(true)

    const friendOnlineList = useAppSelector((state) => {
        return state.user.current
            ? state.user.current.friends?.accepted.filter((f) => f.isOnline)
            : []
    })
    const { loading } = useAppSelector((state) => state.chat)

    useListUserSocket()

    // ẩn hoặc hiện khung chat khi nhấn vào các người online
    const chatWithFriend = useFindRoomByMembers(useToggleChat())

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
            </AccordionDetails>
        </Accordion>
    )
}
