import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0c4a6e",
      light: "#0369a1",
      dark: "#082f49",
    },
    secondary: {
      main: "#0d9488",
    },
    background: {
      default: "#f1f5f9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.06)",
        },
      },
    },
  },
});

export default theme;
