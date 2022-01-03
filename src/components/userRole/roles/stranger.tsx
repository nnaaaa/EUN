import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
                startIcon={<FontAwesomeIcon icon={faPlus} size='xs'/>}
                color="primary"
                size='small'
                sx={{textTransform:'none'}}
            >
                <Typography fontSize={13} fontWeight="bold" noWrap>
                    Add friend
                </Typography>
            </Button>
        )
    }
}
