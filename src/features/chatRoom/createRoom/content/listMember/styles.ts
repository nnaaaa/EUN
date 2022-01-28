import { makeStyles } from '@mui/styles'
import styled from 'styled-components'

export const useStyle = makeStyles((theme) => ({
    chip: {
        marginRight: '0.5rem',
        marginBottom: '0.5rem'
    },
}))

export const ListMemberWrapper = styled.div`
    height:100%;
    padding:0.5rem;
    padding-top:3rem;
    overflow-y: auto;
    display: flex;
    justify-content: flex-start;
    align-content:flex-start;
    flex-wrap:wrap;
`
