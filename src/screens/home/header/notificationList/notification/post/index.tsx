import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material'
import { INotification } from 'models/notification'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import { LazyLoading } from '../../styles'
import { useDetail } from './useDetail'

interface INotificationProps {
    notification: INotification
}

const Notification = ({ notification }: INotificationProps) => {
    const {
        owner: { avatar, username },
        createAt,
        path,
    } = notification
    const user = useAppSelector((state) => state.user.current)
    const createTimeToNow = moment(createAt).fromNow(true)
    const { isLoading, replyTo, post } = useDetail(path)

    if (!user || !replyTo) return <></>

    if (isLoading) return <LazyLoading />

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar src={avatar} component={Link} to={`user/${replyTo.account}`} />
            </ListItemAvatar>
            <ListItemButton
                component={Link}
                to={{ pathname: 'detail/post', state: { post, path } }}
            >
                <ListItemText
                    primary={
                        <>
                            <Typography fontWeight="bold" sx={{ display: 'inline' }}>
                                {username}
                            </Typography>
                            <Typography sx={{ display: 'inline' }}>
                                {' '}
                                comment on{' '}
                            </Typography>
                            <Typography fontWeight="bold" sx={{ display: 'inline' }}>
                                {replyTo?.username}
                            </Typography>
                            <Typography sx={{ display: 'inline' }}>'s post</Typography>
                        </>
                    }
                    secondary={
                        <Typography color="textSecondary" variant="subtitle2">
                            {createTimeToNow}
                        </Typography>
                    }
                    disableTypography
                />
            </ListItemButton>
        </ListItem>
    )
}

export default Notification
