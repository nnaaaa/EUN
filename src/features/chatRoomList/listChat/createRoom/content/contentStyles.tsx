import { makeStyles } from '@mui/styles'
import styled from 'styled-components'

export const useStyle = makeStyles((theme) => ({
    wrapper: {
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chip: {
        marginRight: '0.5rem',
        marginBottom: '0.5rem'
    },
    name: {
        margin: 0,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
        userSelect: 'none',
    },
}))

export const Wrapper = styled.div`
    height: 300px;
    
`

export const WrapperInput = styled.div`
    position: absolute;
    z-index:100;
    overflow-y: auto;
    padding: 0.5rem;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: white;
`
export const ListMember = styled.div`
    height:100%;
    padding:0.5rem;
    padding-top:3rem;
    overflow-y: auto;
    display: flex;
    justify-content: flex-start;
    align-content:flex-start;
    flex-wrap:wrap;
`
