import { Box, Grid } from '@mui/material'
import { useUserSocket } from 'api/socket/user'
import Gutter from 'screens/home/gutter'
import Header from 'screens/home/header'
import ListGame from 'features/listGame'
import ListOnline from 'features/listOnline'
import ListChat from 'features/chatRoom/listChat'
import { IPublicInfo } from 'models/user'
import { useCallback } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { userActions } from 'states/slices/userSlice'
import { HomeLazyLoading, useStyle } from './homeStyles'
import Loading from '../loading'
// import Map from 'components/map'
import Newsfeed from './newsfeed'
import Games from './games'

export default function Home() {
    const style = useStyle()
    const { path } = useRouteMatch()
    const { loading, current: user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => state.auth.state)

    const dispatcher = useCallback(
        (newInfo: IPublicInfo) => {
            dispatch(userActions.updateStore(newInfo))
        },
        [dispatch]
    )
    useUserSocket(user ? user._id : undefined, dispatcher)

    if (loading) return <HomeLazyLoading />

    if (status === 'stranger') return <Redirect to="/auth" />

    return (
        <>
            <Header />
            <Grid container className={style.wrapper} pt={10}>
                <Grid
                    item
                    md={3}
                    className={style.pLeft}
                    sx={{
                        display: {
                            xs: 'none',
                            lg: 'initial',
                        },
                    }}
                >
                    <Gutter />
                </Grid>
                <Grid item xs={12} md={8} lg={6} className={style.pCenter}>
                    <Box
                        sx={{
                            pl: {
                                xs: 2,
                                lg: 0,
                            },
                            pr: {
                                xs: 2,
                                md: 0,
                            },
                        }}
                    >
                        <Switch>
                            <Route path="/games" component={Games} />
                            <Route exact path={path} component={Newsfeed} />
                        </Switch>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={4}
                    lg={3}
                    className={style.pRight}
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'initial',
                        },
                    }}
                >
                    <ListOnline />
                    <ListGame />
                </Grid>

                <ListChat />
            </Grid>
        </>
    )
}
