import { createTheme } from "@mui/material/styles"

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
      light: "#fbbf24",
      dark: "#b45309",
      contrastText: "#1b2a1f",
    },
    background: {
      default: "#f4f7f1",
      paper: "#ffffff",
    },
    text: {
      primary: "#16241a",
      secondary: "#5c6b5f",
    },
    success: { main: "#2e7d32" },
    divider: "rgba(27, 42, 31, 0.08)",
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Nunito Sans", system-ui, -apple-system, sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 700 },
    button: { fontFamily: '"Poppins", sans-serif', fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 22 },
        containedPrimary: {
          boxShadow: "0 8px 20px rgba(46, 125, 50, 0.24)",
          "&:hover": { boxShadow: "0 10px 24px rgba(46, 125, 50, 0.32)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid rgba(27, 42, 31, 0.07)",
          boxShadow: "0 4px 18px rgba(27, 42, 31, 0.05)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 20 },
        outlined: { borderColor: "rgba(27, 42, 31, 0.08)" },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 12, backgroundColor: "#fbfdfa" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "0 1px 0 rgba(27, 42, 31, 0.06)" },
      },
    },
  },
})

export default theme
