import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faComment, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider, Typography } from '@mui/material'
import EmojiPicker from 'features/listReact/picker'
import 'emoji-mart/css/emoji-mart.css'
import { IPostEmotionList } from 'models/react'
import { useReactAndReply } from 'hooks/useReactAndReply'
import className from './styles.module.scss'

interface IInteractTools {
    interactHook: ReturnType<typeof useReactAndReply>
}

export interface IEmotionSelect {
    label: IPostEmotionList
    node: React.ReactNode
}

export default function InteractTool({ interactHook }: IInteractTools) {
    const {
        isJoinReply,
        setJoinReply,
        sendReact,
        myReact,
        reactDefault,
        isCommentLoading,
        isReactLoading,
    } = interactHook
    const colorReact = myReact ? myReact.color : '#a19c9c'
    const colorComment = isJoinReply ? reactDefault.color : '#a19c9c'
    const colorShare = '#a19c9c'

    return (
        <>
            <Divider />
            <Box display="flex" mt={1} className={className.wrapper}>
                <Button
                    disabled={isReactLoading}
                    className={className.reactionButton}
                    startIcon={
                        !myReact || myReact.label === reactDefault.label ? (
                            <FontAwesomeIcon icon={faThumbsUp} />
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
                    <Box className={className.reactionPicker}>
                        <EmojiPicker onSelect={sendReact} iconSize={25} />
                    </Box>
                </Button>
                <Button
                    disabled={isCommentLoading}
                    className={className.button}
                    startIcon={
                        <FontAwesomeIcon icon={isJoinReply ? faCommentDots : faComment} />
                    }
                    sx={{ color: colorComment }}
                    onClick={setJoinReply}
                >
                    <Typography variant="subtitle2" noWrap>
                        {isJoinReply ? 'Hide' : 'Comment'}
                    </Typography>
                </Button>
                <Button
                    sx={{ color: colorShare }}
                    className={className.button}
                    startIcon={<FontAwesomeIcon icon={faShare} />}
                >
                    <Typography variant="subtitle2" noWrap>
                        Share
                    </Typography>
                </Button>
            </Box>
        </>
    )
}
