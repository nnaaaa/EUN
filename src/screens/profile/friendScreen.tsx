import { friendAPI } from 'api/rest'
import ListPost from 'features/blog/listPost'
import { IPublicInfo } from 'models/user'
import { useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import FriendHeader from './browse/header/friendHeader'
import Profile from './index'

export default class FriendProfile extends Profile {
    ListPost = () => {
        return <ListPost type="all" />
    }
    Header = () => {
        const { user } = this.props
        const { index } = this.state

        return <FriendHeader index={index} user={user} setIndex={this.setIndexTabView} />
    }
}

export const FriendProfileHandler = () => {
    const location = useLocation()
    const [user, setUser] = useState<IPublicInfo | undefined>(undefined)
    const myInfo = useAppSelector((state) => state.user.current)
    useEffect(() => {
        const fetchUser = async () => {
            const _id = location.pathname.substring(1)
            const response = await friendAPI.findById(_id)
            return response.data
        }
        fetchUser().then((data) => setUser(data))
    }, [])

    if (user && myInfo && user._id === myInfo._id) return <Redirect to="/profile" />

    return <FriendProfile user={user} />
}
