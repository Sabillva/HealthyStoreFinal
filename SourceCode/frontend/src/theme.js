import { createTheme } from "@mui/material/styles"

// Fresh & natural green palette for the Healthy Food Store.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2e7d32",
      light: "#60ad5e",
      dark: "#1b5e20",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f59e0b",
      contrastText: "#1b2a1f",
    },
    background: {
      default: "#f6f8f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#1b2a1f",
      secondary: "#5c6b5f",
    },
    success: { main: "#2e7d32" },
    divider: "rgba(27, 42, 31, 0.1)",
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Nunito Sans", system-ui, -apple-system, sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"Poppins", sans-serif', fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 20 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: "1px solid rgba(27, 42, 31, 0.08)",
          boxShadow: "0 6px 24px rgba(27, 42, 31, 0.06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 18 },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "0 2px 16px rgba(27, 42, 31, 0.08)" },
      },
    },
  },
})

export default theme
