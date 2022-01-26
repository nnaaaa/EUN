import { Component } from 'react'
import { IFriendPublicInfo } from 'states/slices/friendSlice'
import Accepted from './states/accepted'
import Role from './states'
import Invited from './states/invited'
import Stranger from './states/stranger'
import Pending from './states/pending'

interface IUserRoleProps {
    friend: IFriendPublicInfo
}

interface IUserRoleStates {
    Role: typeof Role
}

class UserRole extends Component<IUserRoleProps, IUserRoleStates> {
    constructor(props: IUserRoleProps) {
        super(props)
        this.state = {
            Role: Stranger,
        }
    }
    componentDidMount() {
        switch (this.props.friend.role) {
            case 'accepted':
                this.setState({ Role: Accepted })
                break
            case 'invited':
                this.setState({ Role: Invited })
                break
            case 'pending':
                this.setState({ Role: Pending })
                break
            default:
                this.setState({ Role: Stranger })
        }
    }
    componentDidUpdate(previousProps: IUserRoleProps, previousState: IUserRoleStates) {
        if (previousProps.friend !== this.props.friend) {
            switch (this.props.friend.role) {
                case 'accepted':
                    this.setState({ Role: Accepted })
                    break
                case 'invited':
                    this.setState({ Role: Invited })
                    break
                case 'pending':
                    this.setState({ Role: Pending })
                    break
                default:
                    this.setState({ Role: Stranger })
            }
        }
    }

    protected changeState = (NewState: typeof Role) => {
        this.setState({ Role: NewState })
    }

    render() {
        return (
            <this.state.Role changeState={this.changeState} friend={this.props.friend} />
        )
    }
}

export default UserRole
