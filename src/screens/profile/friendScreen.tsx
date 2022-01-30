import { friendAPI, userAPI } from 'api/rest'
import { useUserSocket } from 'api/socket/user'
import { IPublicInfo } from 'models/user'
import { useCallback, useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { userActions } from 'states/slices/userSlice'
import FriendHeader from './browse/header/friendHeader'
import Profile from './index'

export default class FriendProfile extends Profile {
    Header = () => {
        const { user } = this.props
        const { index } = this.state

        return <FriendHeader index={index} user={user} setIndex={this.setIndexTabView} />
    }
}

export const FriendProfileHandler = () => {
    const location = useLocation()
    const [user, setUser] = useState<IPublicInfo | undefined>(undefined)
    const dispatch = useAppDispatch()
    const myInfo = useAppSelector((state) => state.user.current)
    useEffect(() => {
        const fetchUser = async () => {
            const _id = location.pathname.substring(6)
            if (_id === myInfo?._id) return myInfo
            const response = await friendAPI.findById(_id)

            return response.data
        }
        fetchUser().then((data) => setUser(data))
    }, [location])

    const dispatcher = useCallback(
        async (newInfo: IPublicInfo) => {
            const res = await userAPI.getProfile()
            dispatch(userActions.updateStore(res.data))
        },
        [setUser]
    )
    useUserSocket(myInfo ? myInfo._id : undefined, dispatcher)

    if (user && myInfo && user._id === myInfo._id) return <Redirect to="/profile" />

    return <FriendProfile user={user} />
}
