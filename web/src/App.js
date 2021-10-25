import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import Success from "./pages/Success";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
        <Route exact path="/success" component={Success} />
      </Switch>
    </Router>
  );
}

export default App;
