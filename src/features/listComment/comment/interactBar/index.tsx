import className from './styles.module.scss'
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material'
import EmojiPicker from 'features/listReact/picker'
import { useReactAndReply } from 'hooks/useReactAndReply'
import { IPostEmotionList } from 'models/react'
import Helper from 'helpers/comment'

interface IInteractBarProps {
    interactHook: ReturnType<typeof useReactAndReply>
}

export interface IEmotionSelect {
    label: IPostEmotionList
    node: React.ReactNode
}

export default function InteractBar({ interactHook }: IInteractBarProps) {
    const {
        isJoinReply,
        setJoinReply,
        sendReact,
        myReact,
        reactDefault,
        isReactLoading,
        isGettingComment,
    } = interactHook

    const colorReact = myReact ? myReact.color : '#a19c9c'
    const colorComment = isJoinReply ? '#1198F6' : '#a19c9c'

    return (
        <Stack p={0.5} flexDirection="row" justifyContent='left' width="min-content">
            <Button
                className={className.reactionButton}
                disabled={isReactLoading}
                size="small"
                sx={{ textTransform: 'none', color: colorReact }}
                onClick={() => {
                    const { label, icon } = myReact ? myReact : reactDefault
                    sendReact({ label, icon })
                }}
            >
                <Typography noWrap fontSize={14}>
                    {myReact ? myReact.icon : reactDefault.icon}{' '}
                    {myReact ? myReact.label : reactDefault.label}
                </Typography>
                <Box className={className.reactionPicker}>
                    <EmojiPicker onSelect={sendReact} iconSize={14} />
                </Box>
            </Button>
            <Tooltip title={Helper.joinComment} placement="top">
                <Box>
                    <Button
                        disabled={isGettingComment}
                        size="small"
                        sx={{
                            textTransform: 'none',
                            px: 1,
                            color: colorComment,
                        }}
                        onClick={setJoinReply}
                    >
                        <Typography noWrap fontSize={14}>
                            💭 {isJoinReply ? 'hide' : 'reply'}
                        </Typography>
                    </Button>
                </Box>
            </Tooltip>
        </Stack>
    )
}
