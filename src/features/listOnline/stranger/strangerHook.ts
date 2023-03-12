import { attachRelationship, filterSearch } from 'algorithms/filterSearch'
import { userAPI } from 'api/restful-user/list/user'
import { IPublicInfo } from 'models/user'
import { useCallback, useEffect, useState } from 'react'
import { IFriendPublicInfo } from 'states/slices/friendSlice'

export const useStrangerSocket = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const [strangerList, setStrangerList] = useState<IPublicInfo[]>([])

    const dispatcher = useCallback(async () => {
        try {
            const userRes = await userAPI.getProfile()
            setLoading(true)
            const strangerRes = await userAPI.getListUser()
            const filterUser = filterSearch(strangerRes.data, userRes.data)
            setStrangerList(
                filterUser.filter(
                    (u) => attachRelationship(u, userRes.data).role !== 'accepted'
                )
            )
        } catch {
            setError('...')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        dispatcher()
    }, [])
    return { loading, error, current: strangerList }
}
