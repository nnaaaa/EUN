import { Accordion, Typography } from '@mui/material'
import styled from 'styled-components'
import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    avatarInside: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        margin: '10px auto',
    },
    item: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})

export const Hobbies = styled(Accordion)`
    box-shadow: none;
    &::before {
        display: none;
    }
`

export const Title = styled(Typography)`
    font-size: 20px;
    font-weight: bold;
    text-align: left;
`
