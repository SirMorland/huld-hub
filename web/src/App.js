
import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import { ThemeProvider } from '@mui/material';

import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import AlmostDone from "./pages/AlmostDone";
import EmailConfirmed from './pages/EmailConfirmed';
import ProfilePage from "./pages/ProfilePage";

import { getProfile, login, register, getCompetenceCategories } from './api';
import theme from './theme';
import Page from './components/Page/Page';

export const UserContext = React.createContext(null);

function App() {
  let [user, setUser] = useState(null);

  let jwt = Cookies.get("hub-jwt");

  useEffect(() => {
      let fetchUser = async (jwt) => {
        const url = `${process.env.REACT_APP_BACKEND_HOST}/users/me`;
        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        });
        if(response.status === 200) {
          let json = await response.json();
          setUser(json);
        } else {
          setUser(false);
        }
      }

      if(jwt) {
        fetchUser(jwt);
      } else {
        setUser(false);
      }

  }, [jwt]);

  if(user === null) {
    return (
      <UserContext.Provider value={user}>
        <ThemeProvider theme={theme}>
          <Page />
        </ThemeProvider>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            {user ?
              <ProfilePage id={user.profile} getProfile={getProfile} getCompetenceCategories={getCompetenceCategories}/>
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
          <Route exact path="/:id">
            <ProfilePage getProfile={getProfile} />
          </Route>
        </Switch>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
