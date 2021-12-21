import {Card, Typography} from '@mui/material'
import styled from 'styled-components'

export const CardMargin = styled(Card)`
  border-radius: 10px;
  margin-bottom: 10px;
`
export const CardContent = styled(Typography)`
  padding: 15px;
  padding-top: 0px;
`

export const Image = styled.img`
  height: auto;
  object-fit: cover;
`

export const StatusInput = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  border-radius: 4rem;
  background: #f0f2f5;
`
