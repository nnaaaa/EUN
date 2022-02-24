import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material'
import { attachRelationship } from 'algorithms/filterSearch'
import { notificationAPI } from 'api/rest/list/notification'
import UserRole from 'components/userRole'
import { INotification } from 'models/notification'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { notificationActions } from 'states/slices/notificationSlice'

interface INotificationProps {
    notification: INotification
}

const Notification = ({ notification }: INotificationProps) => {
    const { owner, createAt, path, _id } = notification
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    const createTimeToNow = moment(createAt).fromNow(true)

    if (!user) return <></>

    return (
        <ListItem
            alignItems="flex-start"
            onClick={async () => {
                await notificationAPI.delete(_id)
                dispatch(notificationActions.delete(_id))
            }}
        >
            <ListItemAvatar>
                <Avatar src={owner.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        <Typography fontWeight="bold" sx={{ display: 'inline' }}>
                            {owner.username}
                        </Typography>
                        <Typography> wanna be your friend </Typography>
                        <UserRole friend={attachRelationship(owner, user)} />
                    </>
                }
                secondary={
                    <Typography color="textSecondary" variant="subtitle2">
                        {createTimeToNow}
                    </Typography>
                }
                disableTypography
            ></ListItemText>
        </ListItem>
    )
}

export default Notification
