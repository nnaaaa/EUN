import { IUser, IPublicInfo } from 'models/user';
export const filterSearch = (data:IPublicInfo[], user:Partial<IPublicInfo>, input:string) => {
    // const exceptMe = data.filter((u) => u.uid !== user.uid)
    // const findName = exceptMe.filter((u) =>
    //     u.name.toLowerCase().includes(input.trim().toLowerCase())
    // )
    // const friendlist = findName.map((u) => {
    //     const compares = user.friends.filter((uid) => uid === u.uid)
    //     if (compares.length) u.isFriend = true
    //     else u.isFriend = false
    //     return u
    // })
    // const checkInviting = friendlist.map((u) => {
    //     const compares = user.listInviting.filter((uid) => uid === u.uid)
    //     if (compares.length) u.isInviting = true
    //     else u.isInviting = false
    //     return u
    // })
    // const checkInvited = checkInviting.map((u) => {
    //     const compares = user.listInvited.filter((uid) => uid === u.uid)
    //     if (compares.length) u.isInvited = true
    //     else u.isInvited = false
    //     return u
    // })
    // return checkInvited
}
