import { createTheme } from "@mui/material/styles";

// See other (default) values: https://mui.com/customization/default-theme/
const theme = createTheme({
  palette: {
    primary: {
      main: "#0047F2",
    },
    secondary: {
      main: "#FC5B8B",
    },
    error: {
      main: "#F73D3D",
    },
    text: {
      primary: "#00173A",
      secondary: "#D9D9D9",
    },
    grey: {
      main: "#BABABA",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Fira Sans",
    fontSize: 16,
    h2: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    h3:{
      fontSize: "20px",
      fontWeight: "bold",
    },
    body1:{
      fontSize: "16px"
    }
  },
  fonts: {
    header: "'Fira Sans', 'Helvetica Neue', Helvetica, sans-serif",
  },
  colors: {
    primaryText: "#00173A"
  }
});

export default theme;
