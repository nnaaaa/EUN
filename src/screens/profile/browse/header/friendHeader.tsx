import Loading from 'screens/loading'
import { useAppSelector } from 'states/hooks'
import Header from '.'
import Relationship from './relationship'

export default class FriendHeader extends Header {
    protected UserTool = () => {
        if (!this.props.user) return <></>

        return <Relationship user={this.props.user} />
    }
}
