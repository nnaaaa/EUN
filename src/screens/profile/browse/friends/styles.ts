import {makeStyles} from '@mui/styles'

export const useStyle = makeStyles({
  wrapper: {
    '&:hover': {
      perspective: 1000,
      transform: 'translate3d(0,0,30px)',
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 14,
  },
  avatar: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})
