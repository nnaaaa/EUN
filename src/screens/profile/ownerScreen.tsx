import ListPost from "features/blog/listPost"
import Profile from "."


export default class OwnerProfile extends Profile {
    protected ListPost(){ return <ListPost type='all'/>}
}