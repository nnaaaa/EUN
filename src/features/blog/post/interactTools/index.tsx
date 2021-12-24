import { Typography, Button, Box, Divider, Popover } from '@mui/material'

import {
    faShare,
    faComment,
    faThumbsUp,
    faCommentDots,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStyle } from './styles'
import { useInteraction } from './interactHook'
import { FacebookCounter,ReactionBarSelector  } from '@charkour/react-reactions';
import { useCallback, useRef, useState } from 'react'
import { IEmotionList } from 'models/react'
import { useReactSocket } from 'api/socket/react'

interface IInteractTools {
    tool: ReturnType<typeof useInteraction>
}

export interface IEmotionSelect{
    label: IEmotionList
    node: React.ReactNode
}


export default function InteractTool(props: IInteractTools) {
    const style = useStyle()
    const { isJoinComment, setJoin, getMyEmotion,sendReact,isReacted } = props.tool
    const likeButton = useRef(null)
    const [toggleEmotion, setToggleEmotion] = useState<boolean>(false)
    const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null)
    const timeoutToggle = useCallback((bool: boolean) => {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setToggleEmotion(bool)
        }, 1000)
    },[toggleEmotion,timeoutRef])

    const colorReact = isReacted ? '#3f51b5' : '#a19c9c'
    const colorComment = isJoinComment ? '#3f51b5' : '#a19c9c'


    return (
        <>
            <Divider />
            <Box display="flex" mt={1}>
                <Button
                    className={style.button}
                    startIcon={<FontAwesomeIcon icon={faThumbsUp} color={colorReact} />}
                    sx={{ color: colorReact }}
                    onClick={() => {
                        timeoutToggle(false)
                        sendReact('like')
                    }}
                    onMouseOver={()=>timeoutToggle(true)}
                    // onMouseLeave={()=>timeoutToggle(false)}
                    ref={likeButton}
                >
                    <Typography
                        variant="subtitle2"
                        className={style.textBtn}
                        // style={{ color: colorReact }}
                    >
                        {getMyEmotion()}
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
                        sx: { borderRadius: '50px', overflow: 'visible', width: '300px' },
                        onMouseOver: () => timeoutToggle(true),
                        onMouseLeave: () => timeoutToggle(false)
                    }}
                    
                >
                    <ReactionBarSelector onSelect={(s:string)=>sendReact(s as IEmotionList)}/>
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
