import Role from '.'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Typography } from '@mui/material'
import { friendAPI } from 'api/rest'
import Stranger from './stranger'

export default class Pending extends Role {
    protected mainButtonClick = async () => {
        try {
            this.loadingStart()
            await friendAPI.cancelInvite(this.props.friend._id)
            this.props.changeState(Stranger)
        } catch (e) {
            console.log(e)
        } finally {
            this.loadingEnd()
        }
    }

    render() {
        return (
            <Button
                startIcon={<FontAwesomeIcon icon={faTimes} size="xs" />}
                variant="contained"
                onClick={this.mainButtonClick}
                disabled={this.state.isLoading}
            >
                <Typography fontSize={14} fontWeight="bold">
                    Cancle invite
                </Typography>
            </Button>
        )
    }
}
