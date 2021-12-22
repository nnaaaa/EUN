import { IPublicInfo } from 'models/user'
import { IFriendPublicInfo } from 'states/slices/friendSlice'

const findMax = (a: number, b: number, c: number) => {
    return a > b ? (a > c ? a : c) : b > c ? b : c
}

export const filterSearch = (data: IPublicInfo[], user: Partial<IPublicInfo>) => {
    if (!user.friends) return []

    const { accepted, invited, pending } = user.friends
    const maxLength = findMax(accepted.length, invited.length, pending.length)
    const exceptMe = data.filter((u) => u.username !== user.username)
    const checkedList: IFriendPublicInfo[] = exceptMe.map((f) => {
        const userWithRole: IFriendPublicInfo = { ...f, role: 'stranger' }
        for (let i = 0; i < maxLength; ++i) {
            if (accepted[i]) {
                if (f._id === accepted[i]._id) {
                    userWithRole.role = 'accepted'
                    break
                }
            } else if (invited[i]) {
                if (f._id === invited[i]._id) {
                    userWithRole.role = 'invited'
                    break
                }
            } else if (pending[i]) {
                if (f._id === pending[i]._id) {
                    userWithRole.role = 'pending'
                    break
                }
            }
        }
        return userWithRole
    })
    return checkedList
}
