import { makeStyles } from '@mui/styles'
import styled from 'styled-components'

export const StatusInput = styled.textarea`
    width: 100%;
    height: 30%;
    font-size: 1rem;
    resize: none;
    border: none;
    outline: none;
`

export const useStyle = makeStyles({
    wrapper: {
        width: '400px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
    },
    name: {
        marginLeft: 2,
        fontWeight: 'bold',
    },
    inputPosition: {
        height: '55%',
        overflow: 'hidden',
        padding: '0 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolBar: {
        border: '1px solid #dad6d6',
        borderRadius: 10,
        marginBottom: 5,
        padding: '10px 15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputArea: {
        width: '100%',
        height: '30%',
        fontSize: '1rem',
        resize: 'none',
        border: 'none',
        outline: 'none',
    }
})
