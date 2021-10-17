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
import { filterSearch } from 'algorithms/filterSearch'
import { userAPI } from 'api/rest'
import UserRole from 'features/header/searchForm/searchResult/userRole'
import { useStyle } from 'features/listOnline/listOnlineStyles'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'states/hooks'
import { IFriendPublicInfo } from 'states/slices/friendSlice'

export default function StrangerOnline() {
    const style = useStyle()
    const [expand, setExpand] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const [strangerList, setStrangerList] = useState<IFriendPublicInfo[]>([])
    const user = useAppSelector((state) => state.user.current)
    useEffect(() => {
        const getListUser = async () => {
            try {
                setLoading(true)
                const res = await userAPI.getListUser()
                const filterUser = filterSearch(res.data, user)
                setStrangerList(filterUser)
            } catch {
                setError('...')
            } finally {
                setLoading(false)
            }
        }
        getListUser().then(() => {})
    }, [])

    if (!strangerList || strangerList.length <= 0 || error) {
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
                {strangerList.map((friend, index) => (
                    <Button
                        className={style.wrapper}
                        color="inherit"
                        key={'listOnline' + index}
                        // onClick={() => toggleChat(name, uid, avatar)}
                    >
                        <Stack direction="row" alignItems="center">
                            <Avatar src={friend.avatar} />
                            <Box ml={1} overflow="hidden">
                                <Typography className={style.name} align="left">
                                    {friend.username}
                                </Typography>
                            </Box>
                        </Stack>
                        <UserRole user={friend} />
                    </Button>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}
