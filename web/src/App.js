import React, { useEffect, useState, useCallback } from "react";
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import { ThemeProvider } from "@mui/material";

import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import AlmostDone from "./pages/AlmostDone";
import EmailConfirmed from "./pages/EmailConfirmed";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import ErrorPage from "./pages/ErrorPage";

import Page from "./components/Page/Page";


import theme from "./theme";
import useUser from "./hooks/useUser";
import { UserProvider, useUserContext } from "./userContext";

/**
 * Protects specific routes by checking if user is logged in with valid jwt token
 * 
 * @param {React.ReactNode} param0 
 * @returns 
 */
const AuthUser = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const { user, jwt } = useUserContext();

  if(user === null) {
    return null;
  }

  if(jwt && user?.confirmed) {
    if(path === "/" || path === "/login" || path === "/register" || path === "/almost-done") {
      // Logged in users are redirected to their profile page from Root, Login, Register and Almost done pages
      return <Redirect to={`/profile/${user.profileId}`} />;
    }
    if(path === "/admin" && user.role.type !== "admin") {
      // Logged in users without admin role trying to access Admin page are shown an error page 
      return <Page><h1>401</h1></Page> //TODO: use actual error page
    }
  } else if(jwt) {
    if(path !== "/almost-done") {
      // Unauthenticated users with jwt set are redirected to Almost done page
      return <Redirect to="/almost-done" />;
    }
  } else {
    if(path === "/" || path === "/almost-done") {
      // Unauthenticated users trying to access Roor or Almost done page are redirected to Login page
      return <Redirect to="/login" />;
    }
    if(path !== "/login" && path !== "/register" && path !== "/email-confirmed") {
      // Unauthenticated users trying to access some other page than Login, Register or Email confirmed are shown an error page
      return <Page><ErrorPage /></Page> //TODO: use actual error page
    }
  }

  return children;
};

function App() {
  const history = useHistory();
  const [jwt, _setJwt] = useState(Cookies.get("hub-jwt"));

  const user = useUser(jwt);

  useEffect(() => {
    _setJwt(Cookies.get("hub-jwt"));
  }, [_setJwt]);

  const setJwt = useCallback(
    (jwt) => {
      if (jwt) {
        Cookies.set("hub-jwt", jwt);
        _setJwt(jwt);
      }
    },
    [_setJwt]
  );

  const logout = useCallback(() => {
    Cookies.remove("hub-jwt");
    _setJwt(null);
    history.push("/login");
  }, [_setJwt, history]);

  return (
    <UserProvider value={{ user, setJwt, jwt, logout }}>
      <ThemeProvider theme={theme}>
        <AuthUser>
          <Switch>
            <Route exact path="/login" component={LoginForm}  />
            <Route exact path="/register" component={RegistrationForm} />
            <Route exact path="/almost-done" component={AlmostDone} />
            <Route exact path="/email-confirmed" component={EmailConfirmed} />

            <Route exact path="/profile/:profileId" component={ProfilePage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/admin" component={AdminPage} />

            <Route>
              <Page>
                <ErrorPage />
              </Page>
            </Route>
          </Switch>
        </AuthUser>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
