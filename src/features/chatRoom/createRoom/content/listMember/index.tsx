import { Avatar, Chip } from '@mui/material'
import { IPublicInfo } from 'models/user'
import { ListMemberWrapper,useStyle } from './styles'

interface IListMemberProps{
    members: IPublicInfo[]
    removeMember: (member:IPublicInfo) => void
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
