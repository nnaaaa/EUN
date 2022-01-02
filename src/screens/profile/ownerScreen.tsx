import ListPost from 'features/blog/listPost'
import Profile from '.'
import OwnerHeader from './browse/header/ownerHeader'

export default class OwnerProfile extends Profile {
    ListPost = () => {
        return <ListPost type="all" />
    }
    Header = () => {
        const { user } = this.props
        const { index } = this.state

        return <OwnerHeader index={index} user={user} setIndex={this.setIndexTabView} />
    }
}
