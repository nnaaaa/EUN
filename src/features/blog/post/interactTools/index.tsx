import { Typography, Button, Box, Divider } from '@mui/material'

import {
    faShare,
    faComment,
    faThumbsUp,
    faCommentDots,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStyle } from './styles'


interface IInteractTools {
    isJoin: boolean
    setJoin: () => void
    isReacted: boolean
}

export default function InteractTool(props: IInteractTools) {
    const style = useStyle()
    const { isJoin, setJoin, isReacted } = props
    const colorReact = isReacted ? '#3f51b5' : '#a19c9c'
    const colorComment = isJoin ? '#3f51b5' : '#a19c9c'
    return (
        <>
            <Divider />
            <Box display="flex" mt={1}>
                <Button
                    className={style.button}
                    startIcon={<FontAwesomeIcon icon={faThumbsUp} color={colorReact} />}
                    // onClick={() => setReact('like')}
                >
                    <Typography
                        variant="subtitle2"
                        className={style.textBtn}
                        style={{ color: colorReact }}
                    >
                        {isReacted ? 'Unlike' : 'Like'}
                    </Typography>
                </Button>
                <Button
                    className={style.button}
                    startIcon={
                        <FontAwesomeIcon
                            icon={isJoin ? faCommentDots : faComment}
                            color={colorComment}
                        />
                    }
                    onClick={setJoin}
                >
                    <Typography
                        variant="subtitle2"
                        className={style.textBtn}
                        sx={{ color: colorComment }}
                    >
                        {isJoin ? 'Hide' : 'Comment'}
                    </Typography>
                </Button>
                <Button
                    className={style.button}
                    startIcon={<FontAwesomeIcon icon={faShare} color="#a19c9c" />}
                >
                    <Typography
                        variant="subtitle2"
                        className={style.textBtn}
                        style={{ color: '#a19c9c' }}
                    >
                        Share
                    </Typography>
                </Button>
            </Box>
        </>
    )
}
