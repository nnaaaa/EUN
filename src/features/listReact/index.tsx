import { Box, Tooltip, Typography } from '@mui/material'
import { IReact } from 'models/react'
import { displayPostReact } from './postCriterion'

interface IEmojiDisplayProps {
    counter: {
        [key: string]: IReact[]
    }
    reacts: IReact[]
    iconSize?: number
    maxDisplay?: number
    displayDefault?: boolean
}

function EmojiDisplay({
    reacts,
    counter,
    iconSize = 14,
    maxDisplay = 1,
    displayDefault,
}: IEmojiDisplayProps) {
    const emoji = Object.values(counter)

    return reacts.length > 0 ? (
        <>
            <Tooltip
                arrow
                title={
                    <div>
                        {Object.values(counter)
                            .map((reactList) => reactList[0].icon + reactList.length)
                            .map((line) => (
                                <div key={line}>
                                    {line} <br />
                                </div>
                            ))}
                    </div>
                }
            >
                <Box
                    width="min-content"
                    height="min-content"
                    display="flex"
                    p={0.1}
                    fontSize={iconSize}
                    sx={{ cursor: 'pointer' }}
                    borderRadius={10}
                >
                    {emoji[0] ? <div>{emoji[0][0].icon}</div> : <></>}
                    {emoji[1] ? <div>{emoji[1][0].icon}</div> : <></>}
                    {reacts.length > 1 ? (
                        <Typography
                            fontSize={iconSize}
                            sx={{ pr: 0.2 }}
                            color="textSecondary"
                        >
                            {reacts.length}
                        </Typography>
                    ) : (
                        <></>
                    )}
                </Box>
            </Tooltip>
        </>
    ) : displayDefault ? (
        <Box
            width="min-content"
            height="min-content"
            display="flex"
            p={0.1}
            fontSize={iconSize}
            sx={{ cursor: 'pointer' }}
            borderRadius={10}
        >
            {/* {Object.values(counter).map((reactList) => {
                return (
                    <Avatar
                        sx={{ p: 0, width: iconSize + 4, height: iconSize + 4 }}
                        children={
                            <div style={{ fontSize: iconSize }}>{reactList[0].icon}</div>
                        }
                        key={reactList.toString()}
                        />
                )
            })} */}
            <div>{displayPostReact[0].icon}</div>
            <div>{displayPostReact[1].icon}</div>
            <Typography
                fontSize={iconSize}
                sx={{ px: 0.2, display: 'inline-block' }}
                color="textSecondary"
            >
                0
            </Typography>
        </Box>
    ) : (
        <></>
    )
}

export default EmojiDisplay
