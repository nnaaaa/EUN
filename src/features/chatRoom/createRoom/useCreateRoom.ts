import { chatAPI } from "api/rest"
import { RefObject, useState } from "react"
import { useAppDispatch, useAppSelector } from "states/hooks"
import { IFriendPublicInfo, searchActions } from "states/slices/searchSlice"

const useCreateRoom = (searchInput: RefObject<HTMLInputElement>) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.user.current)
    const [members, setMembers] = useState<IFriendPublicInfo[]>([])
    const addMember = (friend: IFriendPublicInfo) => {
        dispatch(searchActions.clear())
        setMembers(pre => {
            const isAdded = pre.some(member=>member._id === friend._id)
            if (isAdded) return pre
            return pre.concat([friend])
        })
        if (searchInput && searchInput.current)
            searchInput.current.value = ''
    }
    const removeMember = (friend:IFriendPublicInfo) => {
        setMembers(pre=>pre.filter(member=>member._id !== friend._id))
    }
    const createRoom = async () => {
        if (!user) return
        await chatAPI.create(members.map(m => m._id).concat([user._id]))
        setMembers([])
        dispatch(searchActions.clear())
    }
    return {members,addMember,removeMember,createRoom}
}

export default useCreateRoom