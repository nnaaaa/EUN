import { Box } from '@mui/material'
import { IReact } from 'models/react'
import { displayPostReact } from '../postCriterion'
import className from './styles.module.scss'

interface IEmotionListProps {
    onSelect: (react: Pick<IReact, 'label' | 'icon'>) => void
    iconSize?: number
}

function EmojiPicker({ iconSize, onSelect }: IEmotionListProps) {
    return (
        <Box className={className.wrapper} boxShadow={1} borderRadius={10}>
            {Object.values(displayPostReact).map((react) => (
                <Box
                    className={className.wrapIcon}
                    key={react.label}
                    fontSize={iconSize ? iconSize : 16}
                    onClick={(e) => {
                        e.stopPropagation()
                        onSelect({ label: react.label, icon: react.icon })
                    }}
                >
                    <div className={className.emoji}>{react.icon}</div>
                    <div className={className.label}>{react.label}</div>
                </Box>
            ))}
        </Box>
    )
}

export default EmojiPicker
