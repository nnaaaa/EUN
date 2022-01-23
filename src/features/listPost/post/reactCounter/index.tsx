import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, AvatarGroup, Box, Tooltip, Typography } from '@mui/material'
import { IReact } from 'models/react'
import { IPublicInfo } from 'models/user'
import { useStyle } from './styles'

interface IReactsProps {
    react: IReact
}

export default function ReactCounter(props: IReactsProps) {
    const { react } = props
    const style = useStyle()

    const countAmount = () => {
        if (!react) return 0
        let count = 0
        for (const emotion of Object.values(react)) {
            if (typeof emotion != 'object') continue
            for (const user of emotion) count++
        }
        return count
    }

    return (
        <Box display="flex" alignItems="center" mb={1}>
            <AvatarGroup className={style.group}>
                <Tooltip
                    title={react.like.map((u) => u.username).join('\n')}
                    placement="bottom-start"
                >
                    <Avatar className={style.like}>
                        <FontAwesomeIcon icon={faThumbsUp} color="white" />
                    </Avatar>
                </Tooltip>

                <Tooltip
                    title={react.love.map((u) => u.username).join('\n')}
                    placement="bottom-start"
                >
                    <Avatar className={style.heart}>
                        <FontAwesomeIcon icon={faHeart} />
                    </Avatar>
                </Tooltip>
            </AvatarGroup>
            {/* <PokemonCounter/> */}
            <Typography color="textSecondary" variant="subtitle2">
                {countAmount()}
            </Typography>
        </Box>
    )
}
