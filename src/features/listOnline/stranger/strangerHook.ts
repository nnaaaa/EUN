import { useListUserSocket } from 'api/socket/user'
import { useAppSelector } from 'states/hooks'
import { userAPI } from 'api/rest/list/user'
import { filterSearch } from 'algorithms/filterSearch'
import { IFriendPublicInfo } from 'states/slices/friendSlice'
import { useEffect, useState, useCallback } from 'react'
import { IPublicInfo } from 'models/user'

export const useStrangerSocket = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const [strangerList, setStrangerList] = useState<IFriendPublicInfo[]>([])
    const user = useAppSelector((state) => state.user.current)

    const dispatcher = useCallback((newList: IPublicInfo[]) => {
        const filterUser = filterSearch(newList, user)
        setStrangerList(filterUser)
    }, [])
    useListUserSocket(dispatcher)

    useEffect(() => {
        const getListUser = async () => {
            try {
                setLoading(true)
                const res = await userAPI.getListUser()
                const filterUser = filterSearch(res.data, user)
                setStrangerList(filterUser.filter((u) => u.role === 'stranger'))
            } catch {
                setError('...')
            } finally {
                setLoading(false)
            }
        }
        getListUser().then(() => {})
    }, [user])

    return { loading, error, list: strangerList }
}
