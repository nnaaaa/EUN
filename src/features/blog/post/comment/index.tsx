import { Box, Typography, Avatar, Tooltip } from '@mui/material'
import DisplayGridImages from 'components/images/output2'
import { IComment } from 'models/comment'
import { IPublicInfo } from 'models/user'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useStyle } from './styles'

export default function Comment(props: IComment) {
    const style = useStyle()
    const { content, createAt, owner, images } = props
    const { username, avatar } = owner as IPublicInfo

    const timeDetail = moment(createAt).fromNow()
    return (
        <Box display="flex" mb={1}>
            <Avatar src={avatar} />
            <Box ml={1}>
                <Box p={1} bgcolor="#F0F2F5" borderRadius={2}>
                    <Typography
                        className={style.name}
                        component={Link}
                        to={`/${(owner as IPublicInfo)._id}`}
                    >
                        {username}
                    </Typography>
                    <Tooltip title={timeDetail} placement="right">
                        <Typography className={style.content}>{content}</Typography>
                    </Tooltip>

                    {images.length ? (
                        <Box mt={1}>
                            <DisplayGridImages images={images} title={username} />
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
                {/* <Box p={1} pt={0} display="flex">
                    <Typography className={style.button}>Like</Typography>
                    <Typography className={style.button}>Reply</Typography>
                </Box> */}
            </Box>
        </Box>
    )
}
