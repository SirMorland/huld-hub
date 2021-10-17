import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";
import { makeStyles } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const useStyles = makeStyles({
  body: {
    background: 'linear-gradient(180deg, #00173A 50%, #ffffff 50%)',
  },
});

function App() {
  const classes = useStyles();
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
