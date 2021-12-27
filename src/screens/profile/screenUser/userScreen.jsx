import {Grid, Hidden} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import {Skeleton} from '@material-ui/lab'
import ListBlog from 'features/listBlog/listBlog'
import ListFriends from 'features/listFriends/listFriends'
import ListPhotos from 'features/listPhotos/listPhotos'
import Status from 'features/status/status'
import {useWatchDoc} from 'firebase/useWatching'
import {sortedLastIndex} from 'lodash'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import Actions from 'states/rootAction'
import Friends from '../browse/friends/index.js'
import Intro from '../browse/intro/index.js'
import Photos from '../browse/photos/index.js'
import BrowserInfo from './browerInfo/index'
import {Box} from './userScreenStyles'

export default function UserProfile() {
  const theme = useTheme()

  const [index, setIndex] = useState(0)
  const isLoading = useSelector((state) => state.isLoading)
  const {friends, info, id} = useSelector((state) => state.user)
  const user = useSelector((state) => state.user)
  const listPost = useSelector((state) => state.listPost)
  const dispatch = useDispatch()

  useWatchDoc('users', id, dispatch, Actions.setUserInfo)

  if (isLoading || !id)
    return (
      <Box width="100%">
        <Skeleton height={400} variant="rect" />
        <Skeleton height={50} variant="rect" style={{marginTop: 100}} />
        <Box py={2} px={10} lg={{px: 30}}>
          <Grid container spacing={2}>
            <Grid item md={5}>
              <Skeleton height={120} variant="rect" />
              <Skeleton height={120} variant="rect" />
              <Skeleton height={120} variant="rect" />
            </Grid>
            <Grid item md={7}>
              <Skeleton height={135} variant="rect" />
              <Skeleton height={300} variant="rect" />
              <Skeleton height={300} variant="rect" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    )

  return (
    <Box borderRadius={10} boxShadow={1} bgcolor="white" width="100%">
      <BrowserInfo setIndex={setIndex} index={index} user={user} />
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={index}
        onChangeIndex={(newIdx) => sortedLastIndex(newIdx)}
      >
        <Box py={2} px={3} lg={{px: 30}} bgcolor="#f2f5f6">
          <Grid container spacing={2}>
            <Hidden smDown>
              <Grid item md={5}>
                <Intro info={info} />
                <Photos setIndex={setIndex} />
                <Friends setIndex={setIndex} friends={friends} />
              </Grid>
            </Hidden>
            <Grid item md={7} xs={12}>
              <Status />
              <ListBlog type="me" />
            </Grid>
          </Grid>
        </Box>

        <Box py={2} px={10} md={{px: 30}} bgcolor="#f2f5f6">
          <ListPhotos photos={listPost} />
        </Box>

        <Box py={2} px={10} md={{px: 30}} bgcolor="#f2f5f6">
          <ListFriends friends={friends} />
        </Box>
      </SwipeableViews>
    </Box>
  )
}
