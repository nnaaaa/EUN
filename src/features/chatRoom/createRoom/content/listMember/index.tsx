import { Avatar, Chip } from '@mui/material'
import { IFriendPublicInfo } from 'states/slices/searchSlice'
import { ListMemberWrapper,useStyle } from './styles'

interface IListMemberProps{
    members: IFriendPublicInfo[]
    removeMember: (member:IFriendPublicInfo) => void
}

function ListMember({ members, removeMember }: IListMemberProps) {
    const style = useStyle()
    return (
        <ListMemberWrapper>
            {members.map((member) => (
                <Chip
                    avatar={<Avatar src={member.avatar} />}
                    key={'member' + member._id}
                    label={member.username}
                    className={style.chip}
                    onDelete={() => removeMember(member)}
                />
            ))}
        </ListMemberWrapper>
    )
}

export default ListMember
