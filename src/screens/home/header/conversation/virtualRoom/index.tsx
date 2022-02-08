import { Avatar, AvatarGroup, Button, Stack, Typography } from '@mui/material'
import useDisplayChat from 'features/listRoom/useDisplayChat'
import { useToggleChat } from 'features/listRoom/useToggleChat'
import { IChatRoom } from 'models/chatRoom'
import { ID } from 'models/common'
import { IPublicInfo } from 'models/user'
import moment from 'moment'
import { useStyle } from './styles'

interface IVirtualRoomProps {
    room: IChatRoom
    user: IPublicInfo
    closeConverse: () => void
}

function VirtualRoom({ room, user, closeConverse }: IVirtualRoomProps) {
    const style = useStyle()
    const toggleChat = useToggleChat()
    const { members, roomName } = useDisplayChat(room, user)
    const representMessage = room.messages[0]
    const newMessageAt = moment(room.newMessageAt).fromNow(true)
    let isSeenByMe = false
    let isOwner = false
    if (representMessage) {
        isSeenByMe = (representMessage.seen as ID[]).some((id) => id === user._id)
        isOwner = representMessage.owner._id === user._id
    }
    return (
        <Button
            className={style.wrapper}
            color="primary"
            onClick={async () => {
                closeConverse()
                await toggleChat(room._id)
            }}
            sx={{ textTransform: 'initial' }}
            fullWidth
        >
            <Stack direction="row" alignItems="center" width="100%">
                <AvatarGroup total={members.length}>
                    {members.slice(0, 2).map((member) => (
                        <Avatar src={member.avatar} key={'avatar' + member.avatar} />
                    ))}
                </AvatarGroup>
                <Stack ml={1} overflow="hidden" width="100%">
                    <Typography className={style.name} align="left" noWrap>
                        {roomName}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color={isSeenByMe || isOwner ? 'black' : 'primary'}
                        noWrap
                        textAlign="left"
                    >
                        {representMessage
                            ? representMessage.content
                            : 'Bắt đầu cuộc trò chuyện'}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        textAlign="left"
                    >
                        {newMessageAt}
                    </Typography>
                </Stack>
            </Stack>
        </Button>
    )
}

export default VirtualRoom
