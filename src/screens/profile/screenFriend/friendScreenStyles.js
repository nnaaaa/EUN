import {makeStyles} from '@material-ui/core'
import {compose, spacing, palette, breakpoints} from '@material-ui/system'
import styled from 'styled-components'

export const Box = styled.div`
  ${breakpoints(compose(spacing, palette))}
`

export const css = makeStyles({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})
