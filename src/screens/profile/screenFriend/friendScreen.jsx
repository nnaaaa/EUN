import {Grid, Hidden} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import {Skeleton} from '@material-ui/lab'
import ListBlog from 'features/listBlog/listBlog'
import ListFriends from 'features/listFriends/listFriends'
import ListPhotos from 'features/listPhotos/listPhotos'
import {getDocument} from 'firebase/api'
import {useWatchDoc} from 'firebase/useWatching'
import {sortedLastIndex} from 'lodash'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, useLocation} from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import Actions from 'states/rootAction'
import Friends from '../browse/friends/index.js'
import Intro from '../browse/intro/index.js'
import Photos from '../browse/photos/index.js'
import BrowserInfo from './browerInfo'
import {Box} from './friendScreenStyles'

export default function FriendProfile() {
  const theme = useTheme()
  const {uid: myUid} = useSelector((state) => state.user)
  const isLoading = useSelector((state) => state.isLoading)
  const dispatch = useDispatch()

  const location = useLocation()
  const [index, setIndex] = useState(0)

  const uid = location.pathname.split('/')[2]

  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useWatchDoc('users', myUid, dispatch, Actions.setUserInfo)

  useEffect(() => {
    const fetchData = async () => {
      const user = await getDocument('users', {
        field: 'id',
        operator: '==',
        value: uid,
      })
      const posts = await getDocument('posts', {
        field: 'uid',
        operator: '==',
        value: uid,
      })
      return {user, posts}
    }
    fetchData().then(({user, posts}) => {
      setUser(user)
      setPosts(posts)
    })
  }, [uid])

  if (uid === myUid) return <Redirect to="/profile" />

  // if (isLoading || !user)
  //   return (
      
  //   )

  return (
    <Box borderRadius={10} boxShadow={1} bgcolor="white" width="100%">
      <BrowserInfo setIndex={setIndex} index={index} user={user} />

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={index}
        onChangeIndex={(newIdx) => sortedLastIndex(newIdx)}
      >
        <Box py={2} px={10} lg={{px: 30}} bgcolor="#f2f5f6">
          <Grid container spacing={2}>
            <Hidden smDown>
              <Grid item md={5}>
                <Intro info={user?.info} />
                <Photos setIndex={setIndex} photos={posts} />
                <Friends setIndex={setIndex} friends={user?.friends} />
              </Grid>
            </Hidden>
            <Grid item md={7} xs={12}>
              <ListBlog type="friend" friendAccount={uid} />
            </Grid>
          </Grid>
        </Box>
        <Box py={2} px={10} lg={{px: 30}} bgcolor="#f2f5f6">
          <ListPhotos photos={posts} />
        </Box>
        <Box py={2} px={10} lg={{px: 30}} bgcolor="#f2f5f6">
          <ListFriends friends={user?.friends} />
        </Box>
      </SwipeableViews>
    </Box>
  )
}
