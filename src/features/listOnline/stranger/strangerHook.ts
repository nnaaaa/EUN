import { filterSearch } from 'algorithms/filterSearch'
import { userAPI } from 'api/rest/list/user'
import { useListUserSocket } from 'api/socket/user'
import { useCallback, useEffect, useState } from 'react'
import { IFriendPublicInfo } from 'states/slices/friendSlice'

export const useStrangerSocket = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const [strangerList, setStrangerList] = useState<IFriendPublicInfo[]>([])

    // const dispatcher = useCallback(() => {
    //     userAPI.getProfile().then((user) => {
    //         const getListUser = async () => {
    //             try {
    //                 setLoading(true)
    //                 const res = await userAPI.getListUser()
    //                 const filterUser = filterSearch(res.data, user.data)
    //                 setStrangerList(filterUser.filter((u) => u.role !== 'accepted'))
    //             } catch {
    //                 setError('...')
    //             } finally {
    //                 setLoading(false)
    //             }
    //         }
    //         getListUser().then(() => {})
    //     })
    // }, [])

    // useListUserSocket(dispatcher)

    // useEffect(() => {
    //     dispatcher()
    // }, [])
    return { loading, error, current: strangerList }
}
