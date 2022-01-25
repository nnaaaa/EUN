import { ReactionBarSelector } from '@charkour/react-reactions'
import { faComment, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Button, Divider, Popover, Typography } from '@mui/material'
import { IPost } from 'models/post'
import { IEmotionList } from 'models/react'
import { useCallback, useRef, useState } from 'react'
import { useInteraction } from './interactHook'
import { useStyle } from './styles'

interface IInteractTools {
    tool: ReturnType<typeof useInteraction>
}

export interface IEmotionSelect {
    label: IEmotionList
    node: React.ReactNode
}

export default function InteractTool({ tool }: IInteractTools) {
    const style = useStyle()
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
            <Box display="flex" mt={1}>
                <Button
                    className={style.button}
                    startIcon={
                        <Avatar
                            sx={{
                                width: '30px',
                                height: '30px',
                                background: colorReact,
                                fontSize: '15px',
                            }}
                        >
                            <FontAwesomeIcon icon={myReact.image} size="sm" />
                        </Avatar>
                    }
                    sx={{ color: colorReact }}
                    onClick={() => {
                        timeoutToggle(false)
                        sendReact(myReact.text)
                    }}
                    onMouseOver={() => timeoutToggle(true)}
                    onMouseLeave={() => timeoutToggle(false)}
                    ref={likeButton}
                >
                    <Typography variant="subtitle2" className={style.textBtn}>
                        {myReact.text}
                    </Typography>
                </Button>
                <Popover
                    open={toggleEmotion}
                    anchorEl={likeButton.current}
                    onClose={() => setToggleEmotion(false)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    PaperProps={{
                        sx: { borderRadius: '50px', overflow: 'visible' },
                        onMouseOver: () => timeoutToggle(true),
                        onMouseLeave: () => timeoutToggle(false),
                    }}
                >
                    <ReactionBarSelector
                        onSelect={(s: string) => sendReact(s as IEmotionList)}
                        iconSize={25}
                    />
                </Popover>
                <Button
                    className={style.button}
                    startIcon={
                        <FontAwesomeIcon
                            icon={isJoinComment ? faCommentDots : faComment}
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
                        {isJoinComment ? 'Hide' : 'Comment'}
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
