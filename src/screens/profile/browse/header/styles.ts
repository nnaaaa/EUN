import {makeStyles} from '@mui/styles'

export const useStyle = makeStyles((theme: any) => ({
  logo: {
    fontSize: 50,
    position: 'absolute',
    top: 20,
    left: 20,
    cursor: 'pointer',
    padding: 0,
    marginRight: 5,
    color: theme.palette.primary.main,
    backgroundColor: 'white',
    borderRadius:'50%'
  },
  nav: {
    borderBottom: '1px solid #dad6d6',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  appbar: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  coverPhoto: {
    // backgroundImage: `url(https://localhost)`,
    backgroundColor: 'gray',
    backgroundPosition: 'center center',
    position: 'relative',
    height: 400,
  },
  avatar: {
    position: 'absolute',
    bottom: -20,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: 5,
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
  avatarInside: {
    width: 150,
    height: 150,
    objectFit: 'cover',
  },
  item: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}))

