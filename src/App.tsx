import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useOfflineUser, useOnlineUser } from 'api/socket/hooks'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Authentication from 'screens/authenticate'
import Home from 'screens/home'
import Detail from 'screens/detail'
import NotFound from 'screens/notFound'
import { FriendProfileHandler } from 'screens/profile/friendScreen'
import OwnerProfile from 'screens/profile/ownerScreen'
import { useAppSelector } from 'states/hooks'
import GlobalStyles, { theme } from 'styles/global'

function App() {
    useOnlineUser()
    useOfflineUser()
    const user = useAppSelector((state) => state.user.current)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <HashRouter>
                <Switch>
                    <Route component={Home} exact path="/" />
                    <Route component={Detail} path="/detail" />
                    <Route children={<OwnerProfile user={user} />} path="/profile" />
                    <Route component={Authentication} path="/auth" />
                    <Route component={FriendProfileHandler} path="/user/:account" />
                    <Route component={Home} exact path="/:anything" />
                </Switch>
            </HashRouter>
        </ThemeProvider>
    )
}

export default App
