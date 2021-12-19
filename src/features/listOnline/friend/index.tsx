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
    Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useStyle } from 'features/listOnline/listOnlineStyles'
import { useState } from 'react'
import { useAppSelector } from 'states/hooks'
import { useToggleChat } from './friendHook'

export default function FriendOnline() {
    const style = useStyle()
    const [expand, setExpand] = useState(true)
    const friendOnlineList = useAppSelector((state) => {
        return state.user.current.friends?.accepted.filter((f) => f.isOnline)
    })
    const { loading } = useAppSelector((state) => state.chat)

    // //ẩn hoặc hiện khung chat khi nhấn vào các người online
    const toggleChat = useToggleChat()

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
