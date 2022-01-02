import Header from './'
import EditProfile from './editProfile'

export default class OwnerHeader extends Header {
    protected UserTool() {
        return <EditProfile />
    }
}
