import { makeStyles } from '@mui/styles'
import styled from 'styled-components'

export const useStyle = makeStyles({
    form: {
        minWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 24,
        borderRadius: 8,
        background: '#fff',
        boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
    },
    field: {
        marginBottom: 20,
    },
    signBtn: {
        justifyContent: 'flex-start',
        marginBottom: 10,
        width: '80%',
    },
    lastSignBtn: {
        justifyContent: 'flex-start',
        width: '80%',
    },
})

export const Wrapper = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    background: #f0f2f5;
`

export const Divider = styled.div`
    margin: 2rem auto;
    width: 80%;
    height: 1px;
    background: #ddd7d7;
`
