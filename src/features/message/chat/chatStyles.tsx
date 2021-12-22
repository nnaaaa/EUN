import { IconButton } from '@mui/material'
import { ReactNode } from 'react'

interface IIconBox {
    children: ReactNode
    [key: string]: any
}

export const IconBox = ({ children, ...attr }: IIconBox) => (
    <IconButton color="primary" {...attr} size="small">
        {children}
    </IconButton>
)
