import { Box } from '@mui/material'
import { displayReact } from 'features/listPost/post/interactTools/interactHook'
import { IEmotionList } from 'models/react'
import className from './styles.module.scss'
interface IEmotionListProps {
    onSelect: (label: IEmotionList) => void
    iconSize: number
}

function ReactionBar({ iconSize, onSelect }: IEmotionListProps) {
    return (
        <Box className={className.wrapper} boxShadow={1} borderRadius={10}>
            {Object.values(displayReact).map((react) => (
                <Box
                    className={className.wrapIcon}
                    key={react.label}
                    fontSize={iconSize ? iconSize : 16}
                    onClick={(e) => {
                        e.stopPropagation()
                        onSelect(react.label)
                    }}
                >
                    <div className={className.emoji}>{react.icon}</div>
                    <div className={className.label}>{react.label}</div>
                </Box>
            ))}
        </Box>
    )
}

export default ReactionBar
