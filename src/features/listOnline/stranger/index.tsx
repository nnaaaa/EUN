import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Sd } from '@mui/icons-material'
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
import { atachRelationship } from 'algorithms/filterSearch'
import UserRole from 'components/userRole'
import { useStyle } from 'features/listOnline/listOnlineStyles'
import { useState } from 'react'
import { useAppSelector } from 'states/hooks'
import { useStrangerSocket } from './strangerHook'

export default function StrangerOnline() {
    const style = useStyle()
    const [expand, setExpand] = useState(true)
    const user = useAppSelector((state) => state.user.current)

    //lắng nghe users thay đổi
    const { list, loading, error } = useStrangerSocket()

    if (!list || list.length <= 0 || error || !user) {
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
                    🎄 Có thể bạn biết
                </Typography>
                {loading && <CircularProgress size={20} />}
            </AccordionSummary>
            <AccordionDetails className={style.accorDetail}>
                {list.map((friend, index) => (
                    <Button
                        className={style.wrapper}
                        color="inherit"
                        key={'listStranger' + index}
                    >
                        <Stack direction="row" alignItems="center">
                            <Avatar src={friend.avatar} />
                            <Box ml={1} overflow="hidden">
                                <Typography className={style.name} align="left">
                                    {friend.username}
                                </Typography>
                            </Box>
                        </Stack>
                        <UserRole friend={atachRelationship(friend, user)} />
                    </Button>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}
