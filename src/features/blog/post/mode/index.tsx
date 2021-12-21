import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Typography} from '@mui/material'
import {faGlobe, faUserFriends, faLock} from '@fortawesome/free-solid-svg-icons'
import { IModePost } from 'models/post'

const Mode = ({ mode }: { mode: IModePost }) => {
  if (mode === 'private') return <FontAwesomeIcon icon={faLock} />
  if (mode === 'friend') return <FontAwesomeIcon icon={faUserFriends} />
  return <FontAwesomeIcon icon={faGlobe} />
}

export default Mode
