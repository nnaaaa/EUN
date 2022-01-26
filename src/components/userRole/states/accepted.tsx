import PeopleIcon from '@mui/icons-material/People'
import { Button, Typography } from '@mui/material'
import { friendAPI } from 'api/rest'
import Role from '.'
import Stranger from './stranger'

export default class Accepted extends Role {
    protected mainButtonClick = async () => {
        try {
            if (this.state.isLoading) throw new Error()
            this.loadingStart()
            await friendAPI.removeFriend(this.props.friend._id)
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
                startIcon={<PeopleIcon htmlColor="white" />}
                variant="contained"
                onClick={this.mainButtonClick}
                disabled={this.state.isLoading}
                sx={{ textTransform: 'none' }}
                size="small"
            >
                <Typography fontSize={13} fontWeight="bold" noWrap color="white">
                    Unfriend
                </Typography>
            </Button>
        )
    }
}
