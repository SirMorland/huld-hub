
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import { ThemeProvider } from '@mui/material';

import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import AlmostDone from "./pages/AlmostDone";
import EmailConfirmed from './pages/EmailConfirmed';
import ProfilePage from "./pages/ProfilePage";

import { login, register } from './api';
import theme from './theme';
import Page from './components/Page/Page';
import useUser from './hooks/useUser';

export const UserContext = React.createContext(null);

function App() {
  const jwt = Cookies.get("hub-jwt");
  const user = useUser();

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
              <ProfilePage id={user.profile}/>
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
            <ProfilePage  />
          </Route>
        </Switch>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
