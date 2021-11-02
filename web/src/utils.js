import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import theme from "./theme";

export const renderWithTheme = (children) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
