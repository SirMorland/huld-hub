import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import AlmostDone from "./pages/AlmostDone";
import EmailConfirmed from './pages/EmailConfirmed';
import Profile from "./pages/Profile";

import { login, register } from './api';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginForm onSubmit={login} />
        </Route>
        <Route exact path="/register">
          <RegistrationForm onSubmit={register} />
        </Route>
        <Route exact path="/almost-done" component={AlmostDone} />
        <Route exact path="/email-confirmed" component={EmailConfirmed} />
        <Route exact path="/:id" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
