import { Button, Typography } from '@mui/material'
import { friendAPI } from 'api/rest'
import Role from '.'
import Pending from './pending'

export default class Stranger extends Role {
    protected mainButtonClick = async () => {
        try {
            this.loadingStart()
            await friendAPI.addInvite(this.props.friend._id)
            this.props.changeState(Pending)
        } catch (e) {
            console.log(e)
        } finally {
            this.loadingEnd()
        }
    }

    render() {
        return (
            <Button
                variant="contained"
                onClick={this.mainButtonClick}
                disabled={this.state.isLoading}
                color="primary"
            >
                <Typography fontSize={14} fontWeight="bold">
                    + Add friend
                </Typography>
            </Button>
        )
    }
}
