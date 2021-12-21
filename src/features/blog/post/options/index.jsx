import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Box, Button, Typography, makeStyles} from '@material-ui/core'
import {deleteDocument} from 'firebase/api'
import {postStoreRef} from 'firebase/config'
import React from 'react'
import {useDispatch} from 'react-redux'
import Actions from 'states/rootAction'
import Model from './model/index'

import {useState} from 'react'

const css = makeStyles({
  button: {
    textTransform: 'none',
    fontSize: 13,
    justifyContent: 'space-between',
  },
})

const Options = (info) => {
  const style = css()
  const {id} = info
  const [toggle, setToggle] = useState(false)

  const dispatch = useDispatch()
  const removePost = async () => {
    dispatch(Actions.removeMyPost(id))
    await deleteDocument('posts', id)
    const data = await postStoreRef.child(id).listAll()
    data.items.forEach(async (d) => {
      const p = d.fullPath.split('/')
      p.shift()
      await postStoreRef.child(p.join('/')).delete()
    })
  }

  return (
    <Box p={1} display="flex" flexDirection="column">
      <Button
        className={style.button}
        onClick={() => setToggle(true)}
        startIcon={<FontAwesomeIcon icon={faEdit} color="#999" />}
      >
        <Typography>Edit</Typography>
      </Button>
      <Button
        className={style.button}
        onClick={removePost}
        startIcon={<FontAwesomeIcon icon={faTimes} color="#999" />}
      >
        <Typography>Delete</Typography>
      </Button>
      <Model isPopup={toggle} setPopup={setToggle} {...info} setToggleEdit={setToggle} />
    </Box>
  )
}

export default Options
