import styled from 'styled-components'
import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    btnSend: {
        width: 35,
        height: 35,
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    },
})

export const MessageInput = styled.input`
    font-size: 14px;
    padding: 0.5rem 0.8rem;
    flex: 1;
    border-radius: 4rem;
    background: #f0f2f5;
`
