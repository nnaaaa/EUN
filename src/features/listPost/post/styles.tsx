import { Card, Typography, Box } from '@mui/material'
import SolarSystem2d from 'components/logo/2dSolarSystem'
import { FC } from 'react'
import styled from 'styled-components'
import { Color } from 'styles/global'

export const CardMargin = styled(Card)`
    position: relative;
    border-radius: 10px;
    margin-bottom: 20px;
`

export const CardStyled: FC = ({children})=>{
    return <CardMargin sx={{bgcolor: Color.CARD_BACKGROUND}}>{children}</CardMargin>
}


export const CardContent = styled(Typography)`
    padding: 15px;
    padding-top: 0px;
`

export const Image = styled.img`
    height: auto;
    object-fit: cover;
`

export const CardLoading = () => (
    <Box
        sx={{
            zIndex: 1000,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e0e0e0b3',
        }}
    >
        <SolarSystem2d />
    </Box>
)
