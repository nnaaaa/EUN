import { compose, spacing, palette, breakpoints } from '@mui/system'
import { makeStyles } from '@mui/styles'
import styled from 'styled-components'
export const useStyle = makeStyles({
    wrapper: {
        paddingTop: 80,
    },
    pLeft: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
    },
    pRight: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    pCenter: {
        paddingBottom: 20,
        height: 'auto',
    },
    marginBottom: {
        marginBottom: 10,
    },
})

export const Box = styled.div`
    ${breakpoints(compose(spacing, palette))}
`
