import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import AlmostDone from "./pages/AlmostDone";
import EmailConfirmed from './pages/EmailConfirmed';
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>
        <Route exact path="/register">
          <RegistrationForm />
        </Route>
        <Route exact path="/almost-done" component={AlmostDone} />
        <Route exact path="/email-confirmed" component={EmailConfirmed} />
        <Route exact path="/:id" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
