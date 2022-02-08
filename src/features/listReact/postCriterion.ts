import { blue, red, yellow } from '@mui/material/colors'
import { IPostEmotionList } from 'models/react'

export interface IDisplayCriterionReactType {
    label: IPostEmotionList
    icon: string
    color: string
}
export const displayPostReact: IDisplayCriterionReactType[] = [
    {
        label: 'like',
        icon: '👍🏻',
        color: blue[500],
    },
    {
        label: 'love',
        icon: '❤️',
        color: red[500],
    },
    {
        label: 'haha',
        icon: '😆',
        color: yellow[800],
    },
    {
        label: 'wow',
        icon: '😮',
        color: yellow[800],
    },
    {
        label: 'sad',
        icon: '😢',
        color: yellow[800],
    },
    {
        label: 'angry',
        icon: '😡',
        color: red[500],
    },
]
