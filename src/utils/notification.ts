export const createNotification = (
    title: string,
    options: NotificationOptions,
    onClick: () => void
) => {
    if (!window.Notification) {
        console.error('Browser does not support notifications.')
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            const notify = new Notification(title, options)
            notify.onclick = onClick
        } else {
            // request permission from user
            Notification.requestPermission()
                .then(function (p) {
                    if (p === 'granted') {
                        // show notification here
                        const notify = new Notification(title, options)
                        notify.onclick = onClick
                    } else {
                        console.error('User blocked notifications.')
                    }
                })
                .catch(function (err) {
                    console.error(err)
                })
        }
    }
}
