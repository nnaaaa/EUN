import { CircularProgress, Grid, Hidden, Skeleton, Box } from '@mui/material'

import { useStyle } from './homeStyles'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from 'features/header'
import Gutter from 'features/gutter'
import ListChat from 'features/message/listChat'
import ListOnline from 'features/listOnline'

import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

// import Map from 'components/map'
import Newsfeed from './newsfeed'
import { useAppSelector } from 'states/hooks'
import { useUserSocket } from 'api/socket/user'

export default function Home() {
    const style = useStyle()
    const dispatch = useDispatch()
    const { path } = useRouteMatch()
    const loading = useAppSelector((state) => state.user.loading)
    const status = useAppSelector((state) => state.auth.state)
    const user = useAppSelector((state) => state.user.current)
    useUserSocket(user._id || '')
    // useWatchDoc('users', user._id, dispatch, Actions.setUserInfo)
    // useEffect(() => {
    //     if (id) updateDocument('users', user._id, { isOnline: true })
    // }, [id])

    if (loading) return <CircularProgress />

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

    if (status === 'stranger') return <Redirect to="/auth" />

    return (
        <>
            <Header />
            <Grid container className={style.wrapper}>
                <Hidden mdDown>
                    <Grid item md={3} className={style.pLeft}>
                        <Gutter />
                    </Grid>
                </Hidden>
                <Grid item md={6} xs={12} className={style.pCenter}>
                    <Box
                        sx={{
                            p: {
                                md: 0,
                                lg: 2,
                            },
                        }}
                    >
                        <Switch>
                            <Route exact path={path} component={Newsfeed} />
                        </Switch>
                    </Box>
                </Grid>
                <Hidden mdDown>
                    <Grid item md={3} className={style.pRight}>
                        <ListOnline />
                        {/* <ListGame /> */}
                    </Grid>
                </Hidden>
                <ListChat />
            </Grid>
        </>
    )
}
