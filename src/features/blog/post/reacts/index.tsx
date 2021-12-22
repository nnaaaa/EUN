import { Box, Avatar, Typography, Tooltip, AvatarGroup } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@mui/styles'
import { IPublicInfo } from 'models/user'
const css = makeStyles({
    group: {
        marginRight: 10,
    },
    like: {
        width: 30,
        height: 30,
        background: '#1198F6',
        fontSize: 16,
    },
    heart: {
        width: 30,
        height: 30,
        background: '#F55470',
        fontSize: 16,
    },
})

interface IReactsProps {
    heart: IPublicInfo[]
    like: IPublicInfo[]
}

export default function Reacts(props: IReactsProps) {
    const { heart, like } = props
    const style = css()

    return (
        <Tooltip
            title={'oke'}
            // title={listReact.map((user) => user.name).join('\n')}
            // onOpen={getListReact}
            placement="bottom-start"
        >
            <Box display="flex" alignItems="center" mb={1}>
                <AvatarGroup className={style.group}>
                    <Avatar className={style.like}>
                        <FontAwesomeIcon icon={faThumbsUp} color="white" />
                    </Avatar>
                    <Avatar className={style.heart}>
                        <FontAwesomeIcon icon={faHeart} />
                    </Avatar>
                </AvatarGroup>
                <Typography color="textSecondary" variant="subtitle2">
                    {heart.length + like.length}
                </Typography>
            </Box>
        </Tooltip>
    )
}
