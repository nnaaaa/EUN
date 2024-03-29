import ListPost from 'features/listPost'
import Profile from '.'
import OwnerHeader from './browse/header/ownerHeader'

export default class OwnerProfile extends Profile {
    Header = () => {
        const { user } = this.props
        const { index } = this.state

        return <OwnerHeader index={index} user={user} setIndex={this.setIndexTabView} />
    }
}
