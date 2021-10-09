import React from 'react'
import {Avatar, Box, Button, Divider, Typography} from '@material-ui/core'
import {auth} from 'firebase/config'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Actions from 'states/rootAction'
import {db} from 'firebase/config'

const Options = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {id, name, avatar} = useSelector((state) => state.user)
  const logOut = async () => {
    await auth.signOut()
    dispatch(Actions.setUserInfo({}))
    await db.collection('users').doc(id).update({isOnline: false})
    dispatch(Actions.setLogout())
    history.push('/login')
  }

  return (
    <Box
      p={2}
      width="max-content"
      borderRadius={6}
      boxShadow={2}
      bgcolor="white"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Avatar src={avatar} style={{width: 100, height: 100}} />
      <Typography style={{fontWeight: 'bold'}} gutterBottom>
        {name}
      </Typography>
      <Divider style={{height: 1, marginBottom: 10}} flexItem />
      <Button
        onClick={logOut}
        variant="outlined"
        style={{marginLeft: 'auto'}}
        color="primary"
        size="small"
      >
        <Link to="/login" style={{color: 'inherit'}}>
          Log out
        </Link>
      </Button>
    </Box>
  )
}

export default Options
