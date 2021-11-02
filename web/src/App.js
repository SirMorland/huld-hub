import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import ProfilePage from './pages/ProfilePage';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProfilePage />
    </ThemeProvider>
  );
}

export default App;
