import { chatAPI } from 'api/rest'
import { IPublicInfo } from 'models/user'
import { RefObject, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { searchActions } from 'states/slices/searchSlice'

const useCreateRoom = (searchInput: RefObject<HTMLInputElement>) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    const [members, setMembers] = useState<IPublicInfo[]>([])
    const addMember = (friend: IPublicInfo) => {
        dispatch(searchActions.clear())
        setMembers((pre) => {
            const isAdded = pre.some((member) => member._id === friend._id)
            if (isAdded) return pre
            return pre.concat([friend])
        })
        if (searchInput && searchInput.current) searchInput.current.value = ''
    }
    const removeMember = (friend: IPublicInfo) => {
        setMembers((pre) => pre.filter((member) => member._id !== friend._id))
    }
    const createRoom = async () => {
        try {
            if (!user) return
            await chatAPI.create(members.map((m) => m._id).concat([user._id]))
        } catch (e) {
            console.log(e)
        } finally {
            setMembers([])
            dispatch(searchActions.clear())
        }
    }
    return { members, addMember, removeMember, createRoom }
}

export default useCreateRoom
