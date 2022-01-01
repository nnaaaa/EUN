import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useOfflineUser, useOnlineUser } from 'api/socket/hooks'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Authentication from 'screens/authenticate'
import Home from 'screens/home'
import NotFound from 'screens/notFound'
import {FriendProfileBeforeLoad} from 'screens/profile/friendScreen'
import OwnerProfile from 'screens/profile/ownerScreen'
import { useAppSelector } from 'states/hooks'
import GlobalStyles, { theme } from 'styles/global'

function App() {
    useOnlineUser()
    useOfflineUser()
    const user = useAppSelector(state => state.user.current)
    

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <HashRouter>
                <Switch>
                    <Route component={Home} exact path="/" />
                    <Route children={<OwnerProfile user={user} />} path="/profile" />
                    {/*<Route component={Authentication} path="/login" />
                    <Route component={NotFound} path="/:err" /> */}
                    <Route component={Authentication} path="/auth" />
                    <Route component={FriendProfileBeforeLoad} path="/:account" />
                    <Route component={NotFound} path="/:error" />
                    {/* <Redirect to="/home" /> */}
                </Switch>
            </HashRouter>
        </ThemeProvider>
    )
}

export default App
