import {
    Box,
    Typography,
    Button,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material'
import { useStyle } from 'features/listOnline/listOnlineStyles'

import { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function ListOnline() {
    const style = useStyle()
    const [expand, setExpand] = useState(true)
    // const { friends, uid: myUid } = useSelector((state) => state.user);
    // const listOnline = useSelector((state) => state.listOnline);
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

    // if (listOnline.length < 0)
    //   return (
    //     <Box p={2} borderRadius={5} boxShadow={1} bgcolor="white">
    //       <Typography variant="body2">
    //         Không có bạn bè nào đang online 😓
    //       </Typography>
    //     </Box>
    //   );

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
                    Bạn bè đang trực tuyến 👩‍👧‍👧
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={style.accorDetail}>
                {/* {listOnline.map(({ name, uid, avatar }, index) => (
          <Button
            className={style.wrapper}
            color="inherit"
            key={index}
            onClick={() => toggleChat(name, uid, avatar)}
          >
            <Avatar src={avatar} />
            <Box ml={1} overflow="hidden">
              <Typography className={style.name} align="left">
                {name}
              </Typography>
            </Box>
          </Button>
        ))} */}
            </AccordionDetails>
        </Accordion>
    )
}
