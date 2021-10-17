import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Stack,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useStyle } from 'features/listOnline/listOnlineStyles'
import { useState } from 'react'
import { useAppSelector } from 'states/hooks'

export default function FriendOnline() {
    const style = useStyle()
    const [expand, setExpand] = useState(true)
    const friendOnlineList = useAppSelector((state) => {
        return state.user.current.friends?.accepted.filter((f) => f.isOnline)
    })
    // const listChat = useSelector((state) => state.chat);
    // const dispatch = useDispatch();

    // //ẩn hoặc hiện khung chat khi nhấn vào các người online
    // const toggleChat = async (name, uid, avatar) => {
    //   if (loading) return;
    //   setLoading(true);
    //   if (listChat.find((room) => room.uid === uid)) {
    //     dispatch(Actions.closeChat(uid));
    //     setLoading(false);
    //     return;
    //   }
    //   const room = await getDocument("rooms", {
    //     field: "members",
    //     operator: "array-contains-any",
    //     value: [uid, myUid],
    //   });
    //   dispatch(Actions.addChat({ name, uid, avatar, ...room[0] }));
    //   setLoading(false);
    // };

    // const condition = useMemo(
    //   () => ({ field: "uid", operator: "in", value: friends }),
    //   [friends]
    // );
    // useWatchCollection("users", condition, dispatch, Actions.setListOnline);

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
            </AccordionSummary>
            <AccordionDetails className={style.accorDetail}>
                {friendOnlineList.map((friend, index) => (
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
                    </Button>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}
