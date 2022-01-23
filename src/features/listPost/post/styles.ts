import { Card, Typography } from '@mui/material'
import styled from 'styled-components'

export const CardMargin = styled(Card)`
    border-radius: 10px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.8) !important;
`
export const CardContent = styled(Typography)`
    padding: 15px;
    padding-top: 0px;
`

export const Image = styled.img`
    height: auto;
    object-fit: cover;
`
