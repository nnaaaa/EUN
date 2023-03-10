import { Box, Grid } from '@mui/material'
import { userAPI } from 'api/rest'
import { useUserSocket } from 'api/socket/user'
import { IPublicInfo } from 'models/user'
import { useCallback } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import Header from 'screens/home/header'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { userActions } from 'states/slices/userSlice'
import { DetailLazyLoading, useStyle } from './detailStyles'
import PostDetail from './post'

export default function Detail() {
    const style = useStyle()
    const { path } = useRouteMatch()
    const { loading, current: user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => state.auth.state)

    // const dispatcher = useCallback(
    //     async (newInfo: IPublicInfo) => {
    //         const res = await userAPI.getProfile()
    //         dispatch(userActions.updateStore(res.data))
    //     },
    //     [dispatch]
    // )
    // useUserSocket(user ? user._id : undefined, dispatcher)

    if (loading) return <DetailLazyLoading />

    return (
        <>
            <Header />
            <Box pb={2} pt={10} px={2} className={style.wrapper}>
                <Switch>
                    <Route path={`${path}/post`} component={PostDetail} />
                </Switch>
            </Box>
        </>
    )
}
