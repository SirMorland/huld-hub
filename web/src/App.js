import React, { useEffect, useState, useCallback } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import { ThemeProvider } from "@mui/material";

import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import AlmostDone from "./pages/AlmostDone";
import EmailConfirmed from "./pages/EmailConfirmed";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage";

import { login, register, search } from "./api";
import theme from "./theme";
import useUser from "./hooks/useUser";
import { UserProvider, useUserContext } from "./userContext";

const AuthUser = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const { user, jwt } = useUserContext();


  if (!jwt && (path !== "/login" || path !== "login"))
    return <Redirect to="/login" />;

  if (!jwt && (path !== "/register" || path !== "register"))
    return <Redirect to="/register" />;

  if (!user) return <Redirect to="/almost-done" />;

  return children;
};

function App() {
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

  const removeJwt = useCallback(() => {
    Cookies.remove("hub-jwt");
    _setJwt(null);
  }, [_setJwt]);

  return (
    <UserProvider value={{ user, setJwt, jwt, removeJwt }}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/profile/:id">
            <AuthUser>
              <ProfilePage />
            </AuthUser>
          </Route>
          <Route exact path="/login">
            <AuthUser>
              <LoginForm onSubmit={login} />
            </AuthUser>
          </Route>
          <Route exact path="/register">
            <AuthUser>
              <RegistrationForm onSubmit={register} />
            </AuthUser>
          </Route>
          <Route exact path="/search">
            <AuthUser>
              <SearchPage onSearch={search} />
            </AuthUser>
          </Route>

          <Route exact path="/almost-done" component={AlmostDone} />
          <Route exact path="/email-confirmed" component={EmailConfirmed} />
          <Route>
            <Redirect to="/login" />;
          </Route>
        </Switch>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
