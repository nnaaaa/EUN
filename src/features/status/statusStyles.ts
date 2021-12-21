import {makeStyles} from '@mui/styles'

export const css = makeStyles((theme) => ({
  button: {
    flex: 1,
    fontSize: 20,
    borderRadius: 5,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  textBtn: {
    flex: 1,
    color: '#aaa2a2',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
  },
  inputBtn: {
    width: '100%',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0 15px',
    backgroundColor: '#F0F2F5',
    marginLeft: 10,
  },
  selectWrap: {
    background: 'transparent',
    marginLeft: 10,
    display: 'flex',
  },
  selectItem: {
    padding: 10,
    display: 'flex',
  },
}))

// export const Divider = styled.div`
//   width: 100%;
//   height: 1px;
//   background: #dad6d6;
//   margin: 1rem 0;
// `
