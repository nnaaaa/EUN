import CloseIcon from '@mui/icons-material/Close'
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
            console.error(e)
        } finally {
        }
    }

    render() {
        return (
            <Button
                startIcon={<CloseIcon htmlColor="white" />}
                variant="contained"
                onClick={this.mainButtonClick}
                disabled={this.state.isLoading}
                size="small"
                sx={{ textTransform: 'none' }}
            >
                <Typography fontSize={13} fontWeight="bold" noWrap color="white">
                    Cancle
                </Typography>
            </Button>
        )
    }
}
