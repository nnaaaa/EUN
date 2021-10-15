import { Box } from '@mui/material';
import styled from 'styled-components'

export const Wrapper = styled(Box)`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 10001;
  &:hover {
    cursor: auto;
  }
`

export const Opacity = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10000;

  &:hover {
    cursor: pointer;
  }
`