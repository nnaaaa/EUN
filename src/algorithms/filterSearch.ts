import { IPublicInfo } from 'models/user'
import { IFriendPublicInfo } from 'states/slices/friendSlice'

export const filterSearch = (data: IPublicInfo[], user: IPublicInfo | undefined) => {
    if (!user || !user.friends) return []
    const exceptMe = data.filter((u) => u._id !== user._id)
    return exceptMe
}

export const attachRelationship = (stranger: IPublicInfo, user: IPublicInfo) => {
    const { accepted, invited, pending } = user.friends
    const maxLength = Math.max(accepted.length, invited.length, pending.length)

    const userWithRole: IFriendPublicInfo = { ...stranger, role: 'stranger' }
    for (let i = 0; i < maxLength; ++i) {
        if (accepted[i]) {
            if (stranger._id === accepted[i]._id) {
                userWithRole.role = 'accepted'
                break
            }
        }
        if (invited[i]) {
            if (stranger._id === invited[i]._id) {
                userWithRole.role = 'invited'
                break
            }
        }
        if (pending[i]) {
            if (stranger._id === pending[i]._id) {
                userWithRole.role = 'pending'
                break
            }
        }
    }
    // console.log("role",userWithRole)
    return userWithRole
}
