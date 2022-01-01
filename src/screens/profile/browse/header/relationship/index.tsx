import { atachRelationship } from 'algorithms/filterSearch'
import UserRole from 'components/userRole'
import { IPublicInfo } from 'models/user'
import { useMemo } from 'react'
import Loading from 'screens/loading'
import { useAppSelector } from 'states/hooks'
import { IFriendPublicInfo } from 'states/slices/friendSlice'

const Relationship = (props: { user: IPublicInfo }) => {
    const { user: stranger } = props
    const user = useAppSelector(state => state.user.current)
    const friend = useMemo<IFriendPublicInfo | undefined>(() => {
        if (!user)
            return undefined
        return atachRelationship(stranger, user)
    }, [stranger,user])

    if (!friend)
        return <Loading/>

    return <UserRole friend={friend}/>
}

export default Relationship
