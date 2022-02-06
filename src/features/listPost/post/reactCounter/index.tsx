import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, AvatarGroup, Box, Tooltip, Typography } from '@mui/material'
import { IReact } from 'models/react'
import { IPublicInfo } from 'models/user'
import { useStyle } from './styles'

interface IReactsProps {
    reacts: IReact[]
    counter: {
        [key: string]: IPublicInfo[]
    }
}

export default function ReactCounter(props: IReactsProps) {
    const { reacts, counter } = props
    const style = useStyle()
    return (
        <Box display="flex" alignItems="center" mb={1}>
            <AvatarGroup className={style.group}>
                <Tooltip
                    title={
                        counter.like ? counter.like.map((u) => u.username).join('\n') : ''
                    }
                    placement="bottom-start"
                >
                    <Avatar className={style.like}>
                        <FontAwesomeIcon icon={faThumbsUp} color="white" />
                    </Avatar>
                </Tooltip>

                <Tooltip
                    title={
                        counter.love ? counter.love.map((u) => u.username).join('\n') : ''
                    }
                    placement="bottom-start"
                >
                    <Avatar className={style.heart}>
                        <FontAwesomeIcon icon={faHeart} />
                    </Avatar>
                </Tooltip>
            </AvatarGroup>
            <Typography color="textSecondary" variant="subtitle2">
                {reacts.length}
            </Typography>
        </Box>
    )
}
