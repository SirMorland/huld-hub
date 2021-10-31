import './App.css';
import NavBar from './components/NavBar/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar loggedIn role="admin"/>
    </ThemeProvider>
  );
}

export default App;
