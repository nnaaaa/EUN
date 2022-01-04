import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Typography } from '@mui/material'
import { friendAPI } from 'api/rest'
import Role from '.'
import Accepted from './accepted'
import Stranger from './stranger'
export default class Invited extends Role {
    protected mainButtonClick = async () => {
        try {
            if (this.state.isLoading) throw new Error()
            this.loadingStart()
            await friendAPI.acceptInvite(this.props.friend._id)
            this.loadingEnd()
            this.props.changeState(Accepted)
        } catch (e) {
            console.log(e)
        } finally {
        }
    }
    protected subButtonClick = async () => {
        try {
            if (this.state.isLoading) throw new Error()
            this.loadingStart()
            await friendAPI.refuseInvite(this.props.friend._id)
            this.loadingEnd()
            this.props.changeState(Stranger)
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    render() {
        return (
            <>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.mainButtonClick}
                    startIcon={<FontAwesomeIcon icon={faPlus} size="xs" />}
                    disabled={this.state.isLoading}
                    sx={{ textTransform: 'none' }}
                    size="small"
                >
                    <Typography fontSize={13} fontWeight="bold" noWrap>
                        Accept
                    </Typography>
                </Button>
                <Button
                    startIcon={<FontAwesomeIcon icon={faTimes} size="xs" />}
                    variant="contained"
                    color="error"
                    onClick={this.subButtonClick}
                    disabled={this.state.isLoading}
                    sx={{ ml: 2, textTransform: 'none' }}
                    size="small"
                >
                    <Typography fontSize={13} fontWeight="bold" noWrap>
                        Refuse
                    </Typography>
                </Button>
            </>
        )
    }
}
