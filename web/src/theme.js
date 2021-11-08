import { createTheme } from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";

// See other (default) values: https://mui.com/customization/default-theme/
const theme = createTheme({
  palette: {
    primary: {
      main: "#0047F2",
    },
    secondary: {
      main: "#FF5E89",
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
  shadows: shadows.map(() => "none"),
  typography: {
    fontFamily: "Fira Sans",
    fontSize: 16,
    h2: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    button: {
      fontSize: "16px",
      lineHeight: 1,
      textTransform: "initial"
    }
  },
  shape: {
    borderRadius: 0
  },
  fonts: {
    header: "'Fira Sans', 'Helvetica Neue', Helvetica, sans-serif",
  },
  colors: {
    primaryText: "#00173A"
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          padding: "16px 24px"
        }
      }
    }
  }
});

export default theme;
