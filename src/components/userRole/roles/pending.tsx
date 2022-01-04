import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Typography } from '@mui/material'
import { friendAPI } from 'api/rest'
import Role from '.'
import Stranger from './stranger'

export default class Pending extends Role {
    protected mainButtonClick = async () => {
        try {
            if (this.state.isLoading) throw new Error()
            this.loadingStart()
            await friendAPI.cancelInvite(this.props.friend._id)
            this.loadingEnd()
            this.props.changeState(Stranger)
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    render() {
        return (
            <Button
                startIcon={<FontAwesomeIcon icon={faTimes} size="xs" />}
                variant="contained"
                onClick={this.mainButtonClick}
                disabled={this.state.isLoading}
                size="small"
                sx={{ textTransform: 'none' }}
            >
                <Typography fontSize={13} fontWeight="bold" noWrap>
                    Cancle invite
                </Typography>
            </Button>
        )
    }
}
