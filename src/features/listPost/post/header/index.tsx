import { Avatar, Box, CardHeader, Tooltip, Typography } from '@mui/material'
import { IPost } from 'models/post'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Loading from 'screens/loading'
import { useAppSelector } from 'states/hooks'
import { Color } from 'styles/global'
import Mode from './mode'
import Options from './options'

export default function PostHeader({ post }: { post: IPost }) {
    const { owner, mode, createAt } = post

    const user = useAppSelector((state) => state.user.current)
    const time = moment(createAt).fromNow(true)
    const detailTime = moment(createAt).format('h:mm:ss a, DD MMMM YYYY')

    if (!user) return <Loading />

    return (
        <CardHeader
            avatar={
                <Avatar src={owner.avatar} component={Link} to={`/user/${owner._id}`} />
            }
            title={
                <Typography
                    variant="h6"
                    component={Link}
                    to={`/user/${owner._id}`}
                    color={Color.TEXT_PRIMARY_COLOR}
                >
                    {owner.username}
                </Typography>
            }
            subheader={
                <Box display="flex" alignItems="center">
                    <Tooltip title={detailTime} placement="bottom">
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            sx={{ marginRight: 1 }}
                        >
                            {time}
                        </Typography>
                    </Tooltip>
                    <Tooltip title={mode} placement="bottom">
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            sx={{ marginRight: 1 }}
                        >
                            <Mode mode={mode} />
                        </Typography>
                    </Tooltip>
                </Box>
            }
            action={user._id == owner._id ? <Options post={post} /> : <></>}
        />
    )
}
