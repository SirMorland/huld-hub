import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { ThemeProvider } from "@mui/material";

import theme from "./theme";

export const fetchPost = (url, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const getYear = (data) => {
  if (!data) return "    ";
  const date = new Date(data);
  return date.getFullYear();
};

export const renderWithTheme = (children) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
export const renderWithRouter = (children) => {
  return render(<BrowserRouter>{children}</BrowserRouter>);
};
export const renderHelper = (children) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};
export const capitalizeFirstLetters = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}