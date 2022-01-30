import { IFriendPublicInfo } from 'states/slices/friendSlice'
import { Component } from 'react'

interface IRoleProps {
    changeState: (newState: typeof Role) => void
    friend: IFriendPublicInfo
}

interface IRoleStates {
    isLoading: boolean
}

export default abstract class Role extends Component<IRoleProps, IRoleStates> {
    constructor(props: IRoleProps) {
        super(props)
        this.state = {
            isLoading: false,
        }
    }
    protected abstract mainButtonClick(): void
    protected loadingStart() {
        this.setState({ isLoading: true })
    }
    protected loadingEnd() {
        this.setState({ isLoading: false })
    }
}
