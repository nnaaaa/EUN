import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Typography } from '@mui/material'
import { friendAPI } from 'api/rest'
import Role from '.'
import Accepted from './accepted'
export default class Invited extends Role {
    protected mainButtonClick = async () => {
        this.loadingStart()
        await friendAPI.acceptInvite(this.props.friend._id)
        this.props.changeState(Accepted)
        this.loadingEnd()
    }
    protected subButtonClick = async () => {
        try {
            this.loadingStart()
            await friendAPI.acceptInvite(this.props.friend._id)
            this.props.changeState(Accepted)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            this.loadingEnd()
        }
    }

    render() {
        return (
            <>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.mainButtonClick}
                    disabled={this.state.isLoading}
                >
                    <Typography fontSize={14} fontWeight='bold'>+ Accept</Typography>
                </Button>
                <Button
                    startIcon={<FontAwesomeIcon icon={faTimes} size="xs" />}
                    variant="contained"
                    color="error"
                    onClick={this.subButtonClick}
                    disabled={this.state.isLoading}
                    sx={{ ml: 2 }}
                >
                    <Typography fontSize={14} fontWeight='bold'>Refuse</Typography>
                </Button>
            </>
        )
    }
}
