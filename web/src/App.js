import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>
        <Route path="/register">
          <RegistrationForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
