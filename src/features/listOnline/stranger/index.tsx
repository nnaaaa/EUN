import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Stack,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useStyle } from 'features/listOnline/listOnlineStyles'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import { useStrangerSocket } from './strangerHook'

export default function StrangerOnline() {
    const style = useStyle()
    const [expand, setExpand] = useState(true)
    const user = useAppSelector((state) => state.user.current)

    //lắng nghe users thay đổi
    const { current, loading, error } = useStrangerSocket()

    if (!current || current.length <= 0 || error || !user) {
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
                {/* {loading && <CircularProgress size={20} />} */}
            </AccordionSummary>
            <AccordionDetails className={style.accorDetail}>
                {current.map((friend, index) => (
                    <Box className={style.wrapper} key={'listStranger' + index}>
                        <Stack direction="row" alignItems="center" maxWidth="80%">
                            <Avatar
                                src={friend.avatar}
                                component={Link}
                                to={`/user/${friend.account}`}
                            />
                            <Box ml={1} overflow="hidden">
                                <Typography
                                    className={style.name}
                                    align="left"
                                    noWrap
                                    component={Link}
                                    to={`/user/${friend.account}`}
                                >
                                    {friend.username}
                                </Typography>
                            </Box>
                        </Stack>
                        {/* <UserRole friend={attachRelationship(friend,user)}/> */}
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}
