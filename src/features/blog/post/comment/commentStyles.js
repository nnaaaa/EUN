import {makeStyles} from '@material-ui/core/styles'

export const css = makeStyles({
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    maxWidth: `100%`,
    fontSize: 14,
    overflow: `hidden`,
    wordBreak: `break-word`,
  },
  button: {
    fontSize: 12,
    marginLeft: 3,
    color: '#77797C',
  },
  hover: {
    transition: `0.5s`,
    '&:hover': {
      cursor: 'pointer',
      textDecoration: `underline`,
    },
  },
})
