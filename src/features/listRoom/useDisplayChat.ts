import { IChatRoom } from 'models/chatRoom'
import { IPublicInfo } from 'models/user'

const useDisplayChat = (room: IChatRoom, user: IPublicInfo) => {
    const members = room.members.filter((m) => m._id !== user._id)
    const roomName =
        room.members.length > 2
            ? room.members
                  .map((m) => m.username.split(' '))
                  .map((nameArr) => nameArr[nameArr.length - 1])
                  .join(', ')
            : room.members.find((m) => m._id !== user._id)?.username
    return { members, roomName }
}

export default useDisplayChat
