import { CircularProgress, Grid, Hidden, Skeleton,Box } from '@mui/material'

import { useStyle } from './homeStyles'

import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Header from 'features/header/header'
import Gutter from 'features/gutter/gutter'
import ListChat from 'features/message/listChat/listChat'
import ListOnline from 'features/listOnline/listOnline'

import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom'
import {useWatchDoc} from 'firebase/useWatching'
import Actions from 'states/rootAction'
import {updateDocument} from 'firebase/api'

// import Map from 'components/map'
import Newsfeed from './newsfeed/newsfeed'
import Games from './games/games'
import ListGame from 'features/listGame/listGame'
import { useAppSelector } from 'states/hooks'

export default function Home() {
  const style = useStyle()
  const dispatch = useDispatch()
  const {path} = useRouteMatch()
  const loading = useAppSelector(state=>state.user.loading)
  const status = useSelector((state) => state.login)
  const {id} = useSelector((state) => state.user)

  useWatchDoc('users', id, dispatch, Actions.setUserInfo)
  useEffect(() => {
    if (id) updateDocument('users', id, {isOnline: true})
  }, [id])

  if (loading)
    return <CircularProgress/>
    // return (
    //   <Grid container className={style.wrapper}>
    //     <Hidden smDown>
    //       <Grid item md={3} className={style.pLeft}>
    //         <Skeleton height={300} variant="rectangular" />
    //       </Grid>
    //     </Hidden>
    //     <Grid item md={6} xs={12} className={style.pCenter}>
    //       <Skeleton height={150} variant="rectangular" className={style.marginBottom} />
    //       <Skeleton height={300} variant="rectangular" className={style.marginBottom} />
    //       <Skeleton height={300} variant="rectangular" className={style.marginBottom} />
    //     </Grid>
    //     <Hidden smDown>
    //       <Grid item md={3} className={style.pRight}>
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //       </Grid>
    //       <ListChat />
    //     </Hidden>
    //   </Grid>
    // )

  if (status === false) return <Redirect to="/login" />

  return (
    <>
      <Header />
      <Grid container className={style.wrapper}>
        <Hidden smDown>
          <Grid item md={3} className={style.pLeft}>
            <Gutter />
          </Grid>
        </Hidden>
        <Grid item md={6} xs={12} className={style.pCenter}>
          <Box px={2} px={{md:0}}>
            <Switch>
              <Route exact path={path} component={Newsfeed} />
            </Switch>
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item md={3} className={style.pRight}>
            <ListOnline />
            <ListGame />
          </Grid>
        </Hidden>
        <ListChat />
      </Grid>
    </>
  )
}
