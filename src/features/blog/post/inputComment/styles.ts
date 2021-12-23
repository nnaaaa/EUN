import { makeStyles } from '@mui/styles'
import styled from 'styled-components'

export const StatusInput = styled.input`
    width: 100%;
    height: 2.5rem;
    font-size: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 4rem;
    background: #f0f2f5;
`

export const useStyle = makeStyles({
    form: {
        position: 'relative',
        margin: 0,
        marginBottom: 8,
        width: '100%',
    },
    tool: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0,-50%)',
        right: 8,
    },
})
