import { Component } from 'react'
import { IFriendPublicInfo } from 'states/slices/friendSlice'
import Accepted from './roles/accepted'
import Role from './roles'
import Invited from './roles/invited'
import Stranger from './roles/stranger'
import Pending from './roles/pending'

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
        console.log("component mounted")
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
    componentDidUpdate(previousProps:IUserRoleProps, previousState:IUserRoleStates) {
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

    componentWillUnmount() {
        this.setState({ Role: Stranger })
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
