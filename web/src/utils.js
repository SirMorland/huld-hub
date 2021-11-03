import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import theme from './theme';

export const fetchPost = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
};

export const renderWithTheme = (children) => {
  return render(
  <ThemeProvider theme={theme}>
  {children}
  </ThemeProvider>
  );
};

export const capitalizeFirstLetters = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}