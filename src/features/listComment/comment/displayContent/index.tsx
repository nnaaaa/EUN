import { Box, Tooltip, Typography } from '@mui/material'
import DisplayGridImages from 'components/images/output2'
import { IComment } from 'models/comment'
import { IPublicInfo } from 'models/user'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useStyle } from './styles'

interface IDisplayProps {
    comment: IComment
}

function Display({ comment }: IDisplayProps) {
    const style = useStyle()

    const { content, createAt, owner, images } = comment
    const { username } = owner as IPublicInfo
    const timeDetail = moment(createAt).fromNow()

    return (
        <Box p={1} bgcolor="#F0F2F5" borderRadius={2}>
            <Typography
                className={style.name}
                component={Link}
                to={`/user/${(owner as IPublicInfo)._id}`}
            >
                {username}
            </Typography>
            <Tooltip title={timeDetail} placement="right" arrow>
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
    )
}

export default Display
