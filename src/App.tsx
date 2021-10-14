import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React, { useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Authentication from 'screens/authenticate'
import { loginWithToken } from 'screens/authenticate/authSlice'
import Home from 'screens/home'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import GlobalStyles, { theme } from 'styles/global'

function App() {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.current)
    useEffect(() => {
        dispatch(loginWithToken())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <HashRouter>
                <Switch>
                    <Route component={Home} exact path="/" />
                    {/*<Route component={Authentication} path="/login" />
                    <Route component={UserProfile} path="/profile" />
                    <Route component={FriendProfile} path="/friend/:account" />
                    <Route component={NotFound} path="/:err" /> */}
                    <Route component={Authentication} path="/auth" />
                    {/* <Redirect to="/home" /> */}
                </Switch>
            </HashRouter>
        </ThemeProvider>
    )
}

export default App
