import { IPublicInfo } from 'models/user'
import { IFriendPublicInfo } from 'states/slices/friendSlice'

const findMax = (a: number, b: number, c: number) => {
    return a > b ? (a > c ? a : c) : b > c ? b : c
}

export const filterSearch = (data: IPublicInfo[], user: IPublicInfo | undefined) => {
    if (!user || !user.friends) return []

    const exceptMe = data.filter((u) => u.username !== user.username)
    const checkedList: IFriendPublicInfo[] = exceptMe.map((f) =>
        atachRelationship(f, user)
    )
    return checkedList
}

export const atachRelationship = (stranger: IPublicInfo, user: IPublicInfo) => {
    const { accepted, invited, pending } = user.friends
    const maxLength = findMax(accepted.length, invited.length, pending.length)

    const userWithRole: IFriendPublicInfo = { ...stranger, role: 'stranger' }
    for (let i = 0; i < maxLength; ++i) {
        if (accepted[i]) {
            if (stranger._id === accepted[i]._id) {
                userWithRole.role = 'accepted'
                break
            }
        } else if (invited[i]) {
            if (stranger._id === invited[i]._id) {
                userWithRole.role = 'invited'
                break
            }
        } else if (pending[i]) {
            if (stranger._id === pending[i]._id) {
                userWithRole.role = 'pending'
                break
            }
        }
    }
    return userWithRole
}
