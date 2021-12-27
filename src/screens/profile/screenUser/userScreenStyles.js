import {compose, spacing, palette, breakpoints} from '@material-ui/system'
import styled from 'styled-components'

export const Box = styled.div`
  ${breakpoints(compose(spacing, palette))}
`
