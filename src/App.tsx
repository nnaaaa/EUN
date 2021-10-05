import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import GlobalStyles,{theme} from 'styles/global'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Authentication from 'screens/authenticate'




function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <HashRouter>
                <Switch>
                    {/* <Route component={Home} path="/home" />
                    <Route component={Authentication} path="/login" />
                    <Route component={UserProfile} path="/profile" />
                    <Route component={FriendProfile} path="/friend/:account" />
                    <Route component={NotFound} path="/:err" /> */}
                    <Route component={Authentication} path="/auth" />
                    <Redirect to="/home" />
                </Switch>
            </HashRouter>
        </ThemeProvider>
    )
}

export default App
