import { ReactionBarSelector } from '@charkour/react-reactions'
import { faComment, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Button, Divider, Popover, Typography } from '@mui/material'
import { IEmotionList } from 'models/react'
import { useCallback, useRef, useState } from 'react'
import { useInteraction } from './interactHook'
import className from './styles.module.scss'

interface IInteractTools {
    tool: ReturnType<typeof useInteraction>
}

export interface IEmotionSelect {
    label: IEmotionList
    node: React.ReactNode
}

export default function InteractTool({ tool }: IInteractTools) {
    const { isJoinComment, setJoin, sendReact, isReacted, myReact } = tool
    const likeButton = useRef(null)
    const [toggleEmotion, setToggleEmotion] = useState<boolean>(false)
    const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null)
    const timeoutToggle = useCallback(
        (bool: boolean) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setToggleEmotion(bool)
            }, 1000)
        },
        [toggleEmotion, timeoutRef]
    )
    const colorReact = isReacted ? myReact.color : '#a19c9c'
    const colorComment = isJoinComment ? '#1198F6' : '#a19c9c'

    return (
        <>
            <Divider />
            <Box display="flex" mt={1} className={className.wrapper}>
                <Button
                    className={className.likeButton}
                    startIcon={
                        <FontAwesomeIcon icon={myReact.image} size="sm" color={colorReact}/>
                    }
                    sx={{ color: colorReact }}
                    onClick={() => {
                        timeoutToggle(false)
                        sendReact(myReact.text)
                    }}
                    ref={likeButton}
                >
                    <Typography variant="subtitle2" noWrap>
                        {myReact.text}
                    </Typography>
                    <Box className={className.reactionBar}>
                        <ReactionBarSelector
                            onSelect={(s: string) => sendReact(s as IEmotionList)}
                            iconSize={25}
                        />
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
