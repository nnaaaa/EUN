import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Button, Typography } from '@mui/material'
import { friendAPI } from 'api/rest'
import { notificationAPI } from 'api/rest/list/notification'
import Role from '.'
import Pending from './pending'
export default class Stranger extends Role {
    protected mainButtonClick = async () => {
        try {
            if (this.state.isLoading) throw new Error()
            this.loadingStart()
            await friendAPI.addInvite(this.props.friend._id)
            await notificationAPI.createAddFriendNotification(this.props.friend._id)
            this.loadingEnd()
            this.props.changeState(Pending)
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    render() {
        return (
            <Button
                variant="contained"
                onClick={this.mainButtonClick}
                disabled={this.state.isLoading}
                startIcon={<PersonAddIcon htmlColor="white" />}
                color="primary"
                size="small"
                sx={{ textTransform: 'none' }}
            >
                <Typography fontSize={13} fontWeight="bold" noWrap color="white">
                    Add
                </Typography>
            </Button>
        )
    }
}
