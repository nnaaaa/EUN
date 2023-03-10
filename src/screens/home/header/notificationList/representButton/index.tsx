import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, IconButton, Popover } from '@mui/material'
import { notificationAPI } from 'api/rest/list/notification'
import { useNotificationSocket } from 'api/socket/notification'
import { useRef, useState } from 'react'
import NotificationList from '..'
import { useStyle } from '../../headerStyles'
import useNotificationIterator from '../useNotificationIterator'

const NotificationButton = () => {
    const style = useStyle()
    const [toggleNotice, setToggleNotice] = useState(false)
    const noticeRef = useRef(null)

    const iteratorHook = useNotificationIterator()
    useNotificationSocket()

    const openNotice = async () => {
        setToggleNotice(true)
        await notificationAPI.seenNotification()
    }
    const closeNotice = () => {
        setToggleNotice(false)
    }

    return (
        <>
            <IconButton className={style.icon} ref={noticeRef} onClick={openNotice}>
                {iteratorHook.noticeUnseenAmount ? (
                    <Badge badgeContent={iteratorHook.noticeUnseenAmount} color="warning">
                        <FontAwesomeIcon icon={faBell} />
                    </Badge>
                ) : (
                    <FontAwesomeIcon icon={faBell} />
                )}
            </IconButton>
            <Popover
                open={toggleNotice}
                anchorEl={noticeRef.current}
                onClose={closeNotice}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <NotificationList
                    iteratorHook={iteratorHook}
                    closeNotification={closeNotice}
                />
            </Popover>
        </>
    )
}

export default NotificationButton
