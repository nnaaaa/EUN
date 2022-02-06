import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faComment, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider, Typography } from '@mui/material'
import ReactionBar from 'components/emoji'
import 'emoji-mart/css/emoji-mart.css'
import { IPostEmotionList } from 'models/react'
import { useInteraction } from './interactHook'
import className from './styles.module.scss'

interface IInteractTools {
    tool: ReturnType<typeof useInteraction>
}

export interface IEmotionSelect {
    label: IPostEmotionList
    node: React.ReactNode
}

export default function InteractTool({ tool }: IInteractTools) {
    const { isJoinComment, setJoin, sendReact, myReact, reactDefault, isLoading } = tool
    const colorReact = myReact ? myReact.color : '#a19c9c'
    const colorComment = isJoinComment ? '#1198F6' : '#a19c9c'
    return (
        <>
            <Divider />
            <Box display="flex" mt={1} className={className.wrapper}>
                <Button
                    disabled={isLoading}
                    className={className.likeButton}
                    startIcon={
                        !myReact || myReact.label === reactDefault.label ? (
                            <FontAwesomeIcon icon={faThumbsUp} color={colorReact} />
                        ) : (
                            <></>
                        )
                    }
                    sx={{ color: colorReact }}
                    onClick={() => {
                        const { label, icon } = myReact ? myReact : reactDefault
                        sendReact({ label, icon })
                    }}
                >
                    <Typography variant="subtitle2" noWrap>
                        {!myReact || myReact.label === reactDefault.label ? (
                            <></>
                        ) : (
                            myReact.icon
                        )}{' '}
                        {myReact ? myReact.label : reactDefault.label}
                    </Typography>
                    <Box className={className.reactionBar}>
                        <ReactionBar onSelect={sendReact} iconSize={25} />
                    </Box>
                </Button>
                <Button
                    className={className.button}
                    startIcon={
                        <FontAwesomeIcon
                            icon={isJoinComment ? faCommentDots : faComment}
                            color={colorComment}
                        />
                    }
                    onClick={setJoin}
                >
                    <Typography variant="subtitle2" noWrap sx={{ color: colorComment }}>
                        {isJoinComment ? 'Hide' : 'Comment'}
                    </Typography>
                </Button>
                <Button
                    className={className.button}
                    startIcon={<FontAwesomeIcon icon={faShare} color="#a19c9c" />}
                >
                    <Typography variant="subtitle2" noWrap style={{ color: '#a19c9c' }}>
                        Share
                    </Typography>
                </Button>
            </Box>
        </>
    )
}
