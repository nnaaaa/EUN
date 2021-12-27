import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useOfflineUser, useOnlineUser } from 'api/socket/hooks'
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Authentication from 'screens/authenticate'
import Home from 'screens/home'
import NotFound from 'screens/notFound'
import GlobalStyles, { theme } from 'styles/global'

function App() {
    useOnlineUser()
    useOfflineUser()

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
                    <Route component={NotFound} path='/:error'/>
                    {/* <Redirect to="/home" /> */}
                </Switch>
            </HashRouter>
        </ThemeProvider>
    )
}

export default App
