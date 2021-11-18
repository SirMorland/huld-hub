
import React, { useEffect, useState, useCallback } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import { ThemeProvider } from '@mui/material';

import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import AlmostDone from "./pages/AlmostDone";
import EmailConfirmed from './pages/EmailConfirmed';
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from './pages/SearchPage';

import { login, register, postProfile, uploadPicture, search } from './api';
import theme from './theme';
import Page from './components/Page/Page';
import useUser from './hooks/useUser';

export const UserContext = React.createContext(null);

function App() {
  const [jwt, _setJwt] = useState(Cookies.get("hub-jwt"));

  const user = useUser(jwt);

  useEffect(() => {
    _setJwt(Cookies.get("hub-jwt"));
  }, [_setJwt]);

  const setJwt = useCallback((jwt) => {
    if (jwt) {
      Cookies.set("hub-jwt", jwt);
      _setJwt(jwt);
    }
  }, [_setJwt]);

  const removeJwt = useCallback(() => {
    Cookies.remove("hub-jwt");
    _setJwt(null);
  }, [_setJwt]);

  if (user === null) {
    return (
      <UserContext.Provider value={{ user, setJwt, jwt, removeJwt }}>
        <ThemeProvider theme={theme}>
          <Page />
        </ThemeProvider>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{ user, setJwt, jwt, removeJwt }}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            {user ?
              <ProfilePage id={user.profile} uploadPicture={uploadPicture} postProfile={postProfile} />
              :
              (jwt ?
                <Redirect to="/almost-done" />
                :
                <Redirect to="/login" />
              )
            }
          </Route>
          <Route exact path="/login">
            {user ?
              <Redirect to="/" />
              :
              <LoginForm onSubmit={login} />
            }
          </Route>
          <Route exact path="/register">
            {user ?
              <Redirect to="/" />
              :
              (jwt ?
                <Redirect to="/almost-done" />
                :
                <RegistrationForm onSubmit={register} />
              )
            }
          </Route>
          <Route exact path="/almost-done" component={AlmostDone} />
          <Route exact path="/email-confirmed" component={EmailConfirmed} />
          <Route exact path="/search">
            {user ?
              <SearchPage onSearch={search} />
            :
              (jwt ?
                <Redirect to="/almost-done" />
                :
                <Redirect to="/login" />
              )
            }
          </Route>
          <Route exact path="/profile/:id">
            <ProfilePage onSave={postProfile} />
          </Route>
        </Switch>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
