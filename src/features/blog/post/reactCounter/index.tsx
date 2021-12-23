import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, AvatarGroup, Box, Tooltip, Typography } from '@mui/material'
import { IEmotionList } from 'models/post'
import { IPublicInfo } from 'models/user'
import { useStyle } from './styles'


interface IReactsProps {
    react: Record<IEmotionList,Partial<IPublicInfo>[]> | undefined
}

export default function ReactCounter(props: IReactsProps) {
    const { react } = props
    const style = useStyle()

    const countAmount = () => {
        if (!react)
            return 0
        let count = 0
        for (const emotion of Object.values(react)) {
            for (const user of emotion)
                count++
        }
        return count
    }

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
                {/* <PokemonCounter/> */}
                <Typography color="textSecondary" variant="subtitle2">
                    {countAmount()}
                </Typography>
            </Box>
        </Tooltip>
    )
}
