import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { Box, IconButton, Typography } from '@mui/material'

import { styled as styledMUI } from '@mui/system'

interface IIconBox {
    children: ReactNode
    [key: string]: any
}

export const IconBox = ({ children, ...attr }: IIconBox) => (
    <IconButton color="primary" {...attr} size="small">
        {children}
    </IconButton>
)
