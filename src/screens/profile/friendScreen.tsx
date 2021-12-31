import ListPost from 'features/blog/listPost'
import Profile from './index'

export default class FriendProfile extends Profile {
    protected ListPost(){ return <ListPost type="all" />}
}