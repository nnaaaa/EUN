import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Authentication from "screens/authenticate";
import { useAppDispatch, useAppSelector } from "states/hooks";
import { getProfile } from "states/slices/userSlice";
import GlobalStyles, { theme } from "styles/global";

function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.current)
  useEffect(() => {
    dispatch(getProfile());
  }, []);

    
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
          {/* <Redirect to="/home" /> */}
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
